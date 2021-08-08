const w : number = window.innerWidth 
const h : number = window.innerHeight 
const parts : number = 3 
const strokeFactor : number = 90 
const delay : number = 20 
const sizeFactor : number = 6.9 
const backColor : string = "#BDBDBD"
const colors : Array<string> = [
    "#1A237E",
    "#EF5350",
    "#AA00FF",
    "#C51162",
    "#00C853"
]

class ScaleUtil {
    
    static maxScale(scale : number, i : number, n : number) : number {
        return Math.max(0, scale - i / n)
    }

    static divideScale(scale : number, i : number, n : number) : number {
        return Math.min(1 / n, ScaleUtil.maxScale(scale, i, n)) * n 
    }
}

class DrawingUtil {

    static drawLine(context : CanvasRenderingContext2D, x1 : number, y1 : number, x2 : number, y2 : number) {
        context.beginPath()
        context.moveTo(x1, y1)
        context.lineTo(x2, y2)
        context.stroke()
    }

    static drawLineParallelAway(context : CanvasRenderingContext2D, scale : number) {
        const size : number = Math.min(w, h) / sizeFactor 
        const sc1 : number = ScaleUtil.divideScale(scale, 0, parts)
        const sc2 : number = ScaleUtil.divideScale(scale, 1, parts)
        const sc3 : number = ScaleUtil.divideScale(scale, 2, parts)
        context.lineWidth = Math.min(w, h) / (strokeFactor * 0.5 * (2 - sc2))
        context.save()
        context.translate(w / 2, h / 2)
        for (var j = 0; j < 2; j++) {
            context.save()
            context.scale(1 - 2 * j, 1 - 2 * j)
            context.translate(-size / 2 + (w / 2 + size) * sc3, -size / 2)
            DrawingUtil.drawLine(context, 0, 0, size * sc1, 0)
            context.restore()
        }
        context.restore()
    }

    static drawLPANode(context : CanvasRenderingContext2D, i : number, scale : number) {
        context.lineCap = 'round'
        context.strokeStyle = colors[i]
        DrawingUtil.drawLineParallelAway(context, scale)
    }
}
