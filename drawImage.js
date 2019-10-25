// 路面
function Ground(originX, originY, width, height, img, ctx) {
    this.originX = originX
    this.width = width
    this.ctx = ctx
    this.ground = _groundImg
    this.drawImage = (x) => {
        this.x = this.originX + x
        this.y = height - this.ground.height

        this.ctx.drawImage(img,
            this.ground.x, this.ground.y, this.ground.width, this.ground.height,
            this.x, this.y, this.width, this.ground.height)
        return x
    }
}
// 小仙人掌
function Cactus_small(originX, originY, width, height, img, ctx) {
    this.originX = originX
    this.ctx = ctx
    this.cactusArray = [cactus_s_1, cactus_s_2, cactus_s_3]
    this.cactus = this.cactusArray[random(2)]
    this.x = this.originX
    this.y = height - this.cactus.height

    this.drawImage = (x) => {
        this.x = this.originX + x
        this.y = height - this.cactus.height

        this.ctx.drawImage(img,
            this.cactus.x, this.cactus.y, this.cactus.width, this.cactus.height,
            this.x, this.y, this.cactus.width, this.cactus.height)
    }
    this.getColl = function () {
        return {
            x: this.x,
            y: this.y,
            width: this.cactus.width,
            height: this.cactus.height
        }
    }

}
// 大仙人掌
function Cactus_big(originX, originY, width, height, img, ctx) {
    this.originX = originX
    this.ctx = ctx
    this.cactusArray = [cactus_b_1, cactus_b_2, cactus_b_3]
    this.cactus = this.cactusArray[random(2)]
    this.x = this.originX
    this.y = height - this.cactus.height

    this.drawImage = (x) => {
        this.x = this.originX + x
        this.y = height - this.cactus.height

        this.ctx.drawImage(img,
            this.cactus.x, this.cactus.y, this.cactus.width, this.cactus.height,
            this.x, this.y, this.cactus.width, this.cactus.height)
    }
    this.getColl = function () {
        return {
            x: this.x,
            y: this.y,
            width: this.cactus.width,
            height: this.cactus.height
        }
    }

}
// 翼龙
function Pterosaur(originX, originY, width, height, img, ctx) {
    this.pterArr = [pterosaur_1, pterosaur_1, pterosaur_1, pterosaur_1, pterosaur_1, pterosaur_1, pterosaur_2, pterosaur_2, pterosaur_2, pterosaur_2, pterosaur_2, pterosaur_2]
    this.ctx = ctx
    this.originX = originX
    this.originY = originY
    this.x = originX
    this.getHeight = function (height, pter) {
        let _pter = pter
        let _height = height - _pter.height - 5 - 20
        let mathRandom = Math.random()
        return _height * mathRandom + 20
    }
    this.y = this.getHeight(height, this.pterArr[0])
    this.num = 0
    this.drawImage = function (x) {
        this.x = originX + x
        this.pter = this.pterArr[this.num]
        this.numChange(this.pterArr.length)
        this.ctx.drawImage(img,
            this.pter.x, this.pter.y, this.pter.width, this.pter.height,
            this.x, this.y, this.pter.width, this.pter.height
        )
    }
    this.getColl = function () {
        return {
            x: this.x,
            y: this.y,
            width: this.pter.width,
            height: this.pter.height
        }
    }

    this.numChange = function (length) {
        let len = length
        this.num++
        if (this.num >= len) {
            this.num = 0
        }

    }

}
// 恐龙
function Dino(originX, originY, width, height, img, ctx) {
    this.num = 0
    this.ctx = ctx
    this.state = 'walk'
    this.jumping = false
    this.dino_walk_array = [_dino_1, _dino_1, _dino_1, _dino_2, _dino_2, _dino_2, _dino_3, _dino_3, _dino_3]
    this.dino_jump = _dino_jump
    this.dino_squat_array = [_dino_squat_1, _dino_squat_1, _dino_squat_1, _dino_squat_2, _dino_squat_2, _dino_squat_2]
    this.dino_dead = _dino_dead
    this.dino = this.dino_walk_array[0]
    this.x = originX
    this.y = height - this.dino_walk_array[0].height
    this.originY = null
    this.btn = true
    this.arr = []

    this.getWalk = function () {
        if (this.jumping) return
        this.state = 'walk'
    }
    this.getJump = function () {
        this.state = 'jump'
    }
    this.getSquat = function () {
        if (this.jumping) return
        this.state = 'squat'
    }
    this.getDead = function () {
        this.state = 'dead'
    }

    // 行走
    this.drawWalk = function () {
        this.numChange(this.dino_walk_array.length)
        this.dino = this.dino_walk_array[this.num]
        this.originY = height - this.dino.height
        this.y = height - this.dino.height

        this.ctx.drawImage(img,
            this.dino.x, this.dino.y, this.dino.width, this.dino.height,
            this.x, this.y, this.dino.width, this.dino.height)
    }
    // 跳跃
    this.drawJump = function () {
        this.dino = this.dino_jump
        this.y = this.jumpSpeed()
        this.ctx.drawImage(img,
            this.dino.x, this.dino.y, this.dino.width, this.dino.height,
            this.x, this.y, this.dino.width, this.dino.height)
    }
    // 蹲下
    this.drawSquat = function () {
        this.numChange(this.dino_squat_array.length)
        this.dino = this.dino_squat_array[this.num]
        // this.originY = height - this.dino.height
        this.y = height - this.dino.height

        this.ctx.drawImage(img,
            this.dino.x, this.dino.y, this.dino.width, this.dino.height,
            this.x, this.y, this.dino.width, this.dino.height)
    }
    // 死亡
    this.drawDead = function () {
        this.dino = this.dino_dead
        if (this.y > height - this.dino_dead.height) this.y = height - this.dino_dead.height
        this.ctx.drawImage(img,
            this.dino.x, this.dino.y, this.dino.width, this.dino.height,
            this.x, this.y, this.dino.width, this.dino.height)
    }
    //
    this.drawImage = function () {
        switch (this.state) {
            case 'walk':
                this.drawWalk()
                break;
            case 'jump':
                this.drawJump()
                break;
            case 'squat':
                this.drawSquat()
                break;
            case 'dead':
                this.drawDead()
                break;
            default:
                break;
        }
    }
    // 
    this.getColl = function () {
        return {
            x: this.x,
            y: this.y,
            wm: this.dino.wm,
            hm: this.dino.hm,
            width: this.dino.width,
            height: this.dino.height
        }
    }

    // 工具 
    this.numChange = function (length) {
        let len = length
        this.num++
        if (this.num >= len) {
            this.num = 0
        }

    }
    this.jumpSpeed = function () {
        let max = 0 + 10
        let min = this.originY
        let y = this.y

        this.jumping = true
        // 匀减速
        if (this.btn) {

            let dis = y - max
            y -= dis * 0.18
            this.arr.unshift(y)
        } else if (!this.btn) {
            y = this.arr[0]
            this.arr.shift()
        }

        // !
        if (Math.floor(y) <= max + 3) {
            this.btn = false
        } else if (this.arr.length === 0) {
            this.btn = true
            this.jumping = false
            this.getWalk()
            return y
        }
        return y
    }

}
// 计分板
function ScoreBoard(originX, originY, img, ctx) {
    this.score = score
    this.Hi_X = originX
    this.Hi_Y = originY
    this.Score_X = this.Hi_X + this.score["hi"].width + 10
    this.Score_Y = originY
    this.Time_X = this.Score_X + (this.score["1"].width * 5) + 20
    this.Time_Y = originY

    let hi = new HI(this.Hi_X, this.Hi_Y, img, ctx)
    let _score = new Score(this.Score_X, this.Score_Y, img, ctx)
    let _time = new Score(this.Time_X, this.Time_Y, img, ctx)

    this.drawImage = function (best, time) {
        hi.drawImage()
        _score.drawImage(best)
        _time.drawImage(time)
    }
}
// HI
function HI(originX, originY, img, ctx) {
    this.data = score.hi
    this.img = img
    this.ctx = ctx
    this.originX = originX
    this.originY = originY
    this.x = this.data.x
    this.y = this.data.y
    this.width = this.data.width
    this.height = this.data.height

    this.drawImage = function () {
        this.ctx.drawImage(this.img,
            this.x, this.y, this.width, this.height,
            this.originX, this.originY, this.width, this.height)

    }

    this.getColor = function () {

    }
}
// 分数
function Score(originX, originY, img, ctx) {
    this.numArr = []

    // 初始化每个数字
    for (let i = 0; i < 5; i++) {
        this.numArr.push(new Num(originX + i * 10, originY, img, ctx))
    }

    // 绘制
    this.drawImage = function (number) {
        this.num = number.toString()
        this.len = this.num.length - 1
        for (let i = 4; i > -1; i--) {
            if (this.len > -1) {
                let num = this.num[this.len]
                this.len -= 1
                this.numArr[i].drawImage(num)
            } else {
                this.numArr[i].drawImage("0")
            }

        }



    }

}
// 单个数字
function Num(originX, originY, img, ctx) {
    this.score = score
    this.img = img
    this.ctx = ctx
    this.x = originX
    this.y = originY

    this.drawImage = function (num) {
        let _num = this.score[num]

        this.ctx.drawImage(this.img,
            _num.x, _num.y, _num.width, _num.height,
            this.x, this.y, _num.width, _num.height)
    }
}
// 游戏结束
function GameOver(originX, originY, img, ctx) {
    this.image = game_over
    this.originX = originX
    this.originY = originY
    this.x = this.image.x
    this.y = this.image.y
    this.width = this.image.width
    this.height = this.image.height
    this.img = img
    this.ctx = ctx



    this.drawImage = function () {
        this.ctx.drawImage(this.img,
            this.x, this.y, this.width, this.height,
            this.originX, this.originY, this.width, this.height
        )
    }


}

/**************************
 ******   实例图画   *******
 **************************/

/**
* 实例化路面
* @param {Number} originX 初始位置
* @param {Number} width 路面长度
* @returns {Array} 
*/
function createGround(originX, width, height, img, ctx) {
    let arr = []

    arr.push(new Ground(originX, null, width, height, img, ctx))
    return arr
}
/**
 * 实例化仙人掌堆
 * @param {Number} originX 初始位置 
 * @returns {Array} 
 */
function createCactus(originX, height, time, img, ctx) {
    let arr = []
    let num = random(1) // 决定是大还是小


    if (time > 200) {
        // 翼龙
        if (Math.random() > 0.7) {
            let pter = new Pterosaur(originX, null, null, height, img, ctx)
            arr.push(pter)
            // 仙人掌
        } else {
            // small
            if (num === 1) {
                let num = random(1) // 决定是一个还是两个
                while (num < 2) {
                    let cactus = new Cactus_small(originX + num * 17, null, null, height, img, ctx)
                    arr.push(cactus)
                    num++
                }
            }
            //big
            if (num === 0) {
                let cactus = new Cactus_big(originX, null, null, height, img, ctx)
                arr.push(cactus)
            }
        }
    } else {
        // small
        if (num === 1) {
            let num = random(1) // 决定是一个还是两个
            while (num < 2) {
                let cactus = new Cactus_small(originX + num * 17, null, null, height, img, ctx)
                arr.push(cactus)
                num++
            }
        }
        //big
        if (num === 0) {
            let cactus = new Cactus_big(originX, null, null, height, img, ctx)
            arr.push(cactus)
        }
    }


    return arr
}



// 绘制背景
/**
 * 
 * @param {Number} originX 初始位置 
 * @param {Number} width  背景宽度
 * @param {Number} height  背景高度
 * @param {Boolean} btn 是否开启景观
 * @param {Number} time 游戏时间 进行难度升级 待定
 */
function createBackground(originX, width, height, btn, time, img, ctx) {
    let arr = []
    let _btn = btn
    if (typeof _btn === 'undefined') _btn = true

    // 路面
    arr = arr.concat(createGround(originX, width, height, img, ctx))

    if (_btn) {
        // 仙人掌
        arr = arr.concat(createCactus(width * 0.3, height, time, img, ctx))
        arr = arr.concat(createCactus(width * 0.6, height, time, img, ctx))
        arr = arr.concat(createCactus(width * 0.9, height, time, img, ctx))
    }

    return arr
}




/**
 * 初始化坐标X
 * @param {Number} originX    初始化X轴位置 
 */
function XAxis(originX) {
    this.originX = originX
    this.x = this.originX

    this.getXAxis = function (x) {
        this.x = x
        return this.x
    }
    this.setXAxis = function (speed) {
        this.x -= speed
        return this.x
    }
}
/**
 * 初始化坐标Y
 * @param {Number} origin      初始化Y轴位置 
 */
function YAxis(origin) {
    this.originX = origin
    this.min = 0 + 10
    this.max = origin
    this.y = this.originX
    this.getYAxis = function (speed) {
        this.speed = speed
        this.y -= this.speed

        if (this.y <= this.min) {
            this.speed = -this.speed
        }
        if (this.y >= this.max) {
            this.y = this.originX
        }


        return this.y
    }
    this.setYAxis = function (y) {
        this.y = y
        return this.y
    }
}


function random(maxNum) {
    let num = Math.random() * maxNum
    if (num / maxNum > 0.5) {
        return Math.ceil(num)
    } else {
        return Math.floor(num)
    }
}