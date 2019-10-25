
function ChromeDino(el, imgSrc) {
    this.el = el
    this.src = imgSrc

    this.img = null
    this.ctx = null
    this.width = null
    this.height = null

    this.timer = null
    this.x1 = null
    this.x2 = null
    this.bgArr1 = null
    this.bgArr2 = null
    this.dino = null
    this.over = null
    this.bg_coll_Arr = []

    this.start = true
    this.time = 0
    this.speed = 5
    this.score = 0
    // 执行
    this.createCanvas()

}
/**
 * 
 */
ChromeDino.prototype.createCanvas = function () {
    // el
    if (typeof this.el === 'string') {
        this.el = document.querySelector(this.el)
    } else if (typeof this.el === 'object') {
        this.el = el
    } else {
        console.log('el输入错误')
        return
    }
    this.ctx = this.el.getContext('2d')
    this.ctx.fillStyle = "orange"
    this.width = this.el.clientWidth
    this.height = this.el.height
    this.img = new Image()
    this.img.src = this.src
    // 绑定事件
    this.addEvent()
    this.img.onload = this.initData.bind(this)
}
//
ChromeDino.prototype.initData = function () {
    // 初始化时间
    this.start = true
    this.time = 0
    this.speed = 5
    this.aTime = 0
    // 初始化坐标
    this._x1 = new XAxis(0)
    this._x2 = new XAxis(1200)
    // 初始化场景
    this.bgArr1 = createBackground(0, 1200, this.height, false, this.time, this.img, this.ctx)
    this.bgArr2 = createBackground(0, 1200, this.height, true, this.time, this.img, this.ctx)
    this.dino = new Dino(10, null, null, this.height, this.img, this.ctx)
    this.over = new GameOver(this.width / 2 - 95, 40, this.img, this.ctx)
    // 初始化场景坐标数组
    this.bg_coll_Arr = []
    this.bgArr2.forEach(val => {
        if (val.getColl) {
            this.bg_coll_Arr.push(val)
        }
    })
    // 初始化计分板
    this.scoreBoard = new ScoreBoard(400, 10, this.img, this.ctx)

    // 执行动画
    this.animate()
}
// 添加事件
ChromeDino.prototype.addEvent = function () {
    window.addEventListener('keydown', this.keyDownEvent.bind(this))
    window.addEventListener('keyup', this.keyUpEvent.bind(this))
}
// 移除事件
ChromeDino.prototype.removeEvent = function () {
    window.removeEventListener('keydown', this.keyDownEvent.bind(this))
    window.removeEventListener('keyup', this.keyUpEvent.bind(this))
}
// 运行动画
ChromeDino.prototype.animate = function () {
    this.timer = requestAnimationFrame((e) => {
        this.animate()
        if (!this.aTime) this.aTime = Date.now()
        this.time = this.getTime(Date.now() - this.aTime)
    })
    this.controller()
}
// 终止动画
ChromeDino.prototype.cancelAnimate = function () {
    window.cancelAnimationFrame(this.timer)
}
// 坐标控制
ChromeDino.prototype.controller = function () {
    this.XAxis()
    this.collision()
    this.addDiff()
    this.draw()

}
// 坐标
ChromeDino.prototype.XAxis = function () {
    // 坐标移动
    if (this.x1 < -1200) {
        this._x1.getXAxis(1200)
        this.x1 = this._x1.setXAxis(this.speed)
        this.bgArr1 = createBackground(0, 1200, this.height, true, this.time, this.img, this.ctx)
        this.bgArr1.forEach(val => {
            if (val.getColl) {
                this.bg_coll_Arr.push(val)
            }
        })
    } else if (this.x2 < -1200) {
        this._x2.getXAxis(1200)
        this.x2 = this._x2.setXAxis(this.speed)
        this.bgArr2 = createBackground(0, 1200, this.height, true, this.time, this.img, this.ctx)
        this.bgArr2.forEach(val => {
            if (val.getColl) {
                this.bg_coll_Arr.push(val)
            }
        })
    } else {
        this.x1 = this._x1.setXAxis(this.speed)
        this.x2 = this._x2.setXAxis(this.speed)
    }
}
// 碰撞检测
ChromeDino.prototype.collision = function () {
    let dino = this.dino.getColl()
    let bg = this.bg_coll_Arr[0].getColl()

    if (bg.x < 0) {
        this.bg_coll_Arr.shift()
        bg = this.bg_coll_Arr[0].getColl()
    }
    let dino_up = {
        x: dino.x,
        y: dino.y,
        width: dino.width,
        height: dino.hm
    }
    let dino_dowm = {
        x: dino.x,
        y: dino.y,
        width: dino.wm,
        height: dino.height - dino.hm
    }

    // 检测碰撞
    if (this.getCollide(dino_up, bg)) {
        console.log('YYYYYYY')
        this.start = false
    } else if (this.getCollide(dino_dowm, bg)) {

        this.start = false
        console.log('XXXXXXXX')
    }

}
// 绘画
ChromeDino.prototype.draw = function () {
    this.ctx.clearRect(0, 0, this.width, this.height)
    // 游戏结束 
    if (!this.start) {
        this.gameOver()
    }
    // 恐龙
    this.dino.drawImage()
    this.bgArr1.forEach(val => {
        val.drawImage(this.x1)
    })
    // 障碍物
    this.bgArr2.forEach(val => {
        val.drawImage(this.x2)
    })
    // 计分板
    this.scoreBoard.drawImage(this.score, this.time)

}

// 游戏结束
ChromeDino.prototype.gameOver = function () {
    // 算出最高分
    if (this.time > this.score) this.score = this.time
    this.over.drawImage()
    this.dino.getDead()
    this.cancelAnimate()
}


/*****************************************/
/**
 * 检测两矩形是否重叠
 * @param {Object} 小恐龙
 * @param {Object} 背景
 * @return {Boolean} 是否重叠
 */
ChromeDino.prototype.getCollide = function (dino, bg) {

    if (bg.x > dino.x + dino.width ||
        bg.x + bg.width < dino.x ||
        bg.y > dino.y + dino.height ||
        bg.y + bg.height < dino.y) {
        return false
    }
    return true


}
/**
 * 获取毫秒数
 * @param {Number} e 毫秒数
 * @return {Number} 毫秒
 */
ChromeDino.prototype.getTime = function (e) {
    let time = e / 100
    if (time < 0) return 0
    return Math.round(time)
}
// 增加速度
ChromeDino.prototype.addDiff = function () {
    this.speed = Math.floor(this.time / 100) * 0.5 + 5
}

ChromeDino.prototype.keyDownEvent = function (e) {
    if (e.code === 'Space' || e.code === 'ArrowUp') {
        if (!e.repeat) {
            if (!this.start) {
                this.initData()
                this.start = true
            }
            if (this.time == 0) return
            // e.time = Date.now()
            this.dino.getJump()
        }
    } else if (e.code === 'ArrowDown') {
        if (!e.repeat) {
            this.dino.getSquat()
        }
    }

}
ChromeDino.prototype.keyUpEvent = function (e) {
    if (e.code === 'Space' || e.code === 'ArrowUp') {
        if (!e.repeat) {
            // let time = Date.now() - e.time
        }
    } else if (e.code === 'ArrowDown') {
        if (!e.repeat) {
            this.dino.getWalk()
        }
    }
}
