import { Layer, Shape, Stage } from "react-konva";
import { useForm } from "react-hook-form";
import { useState } from "react";

const p = [
    [159, 156, false, 1],
    [159, 100, true, 1],
    [180, 100, true, 1],
    [180, 145, true, 1],
    [220, 125, false, 1],
    [130, 170, true, 1],
    [130, 270, true, 1],
    [310, 270, true, 1],
    [310, 170, true, 1],
    [130, 170, true, 1],
    [220, 125, true, 1],
    [310, 170, true, 1],
    [235, 210, false, 1],
    [205, 210, true, 1],
    [205, 240, true, 1],
    [235, 240, true, 1],
    [235, 210, true, 1],

    // pattern:
    [0, 0, false, 1],
]

const reflection = [
    [-1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
]

function App() {
    const {register, handleSubmit, watch} = useForm({
        defaultValues: {
            size_x: 1,
            rotate: 0,
            glass: false
        }
    });

    const {rotate, glass, size_x} = watch()

    const [points, setPoints] = useState([...p]);

    const rotation = () => {
        setPoints(s => [...s.map(([x, y, isDraw, thirdParty]) => {
            const g = Math.PI * (rotate) / 180
            console.log(points, g);
            const nx = (x * Math.cos(g) + y * Math.sin(g))
            const ny = x * -Math.sin(g) + y * Math.cos(g)
            return [nx, ny, isDraw, thirdParty]
        })])
    }

    const glassing = () => {
        setPoints(s => [...s.map(([x, y, isDraw, thirdParty]) => {
            if (glass) {
                const g = Math.PI
                const nx = (x * Math.cos(g) + y * Math.sin(g) + 400)
                const ny = x * -Math.sin(g) + y * Math.cos(g) + 400
                return [nx, ny, isDraw]
            } else
                return [x, y, isDraw, thirdParty]
        })])
    }

    const resizer = () => {
        setPoints(s => [...s.map(([x, y, isDraw, thirdParty]) => {
            const nx = x * size_x
            return [nx, y, isDraw, thirdParty]
        })])
    }

    return (
        <div className="App">
            <div onSubmit={handleSubmit(() => {
            })}>
                Увеличение по x: {'  '}
                <input ref={register()} name='size_x' onChange={() => resizer()} step={0.02} min={0.01} type="number"/>
                <br/>
                Поворот: {'  '}
                <input ref={register()} name='rotate' type="number" onChange={() => rotation()}/>
                Отражение: {'  '}
                <input ref={register()} name='glass' type='checkbox' onChange={() => glassing()}/>
                <br />
                Вернуть к истокам: {'  '}
                <input ref={register()} name='glass' type='checkbox' onChange={() => setPoints([...p])}/>
            </div>
            <Stage height={'900'} width={'1920'}>
                <Layer>
                    <Shape
                        sceneFunc={(context, shape) => {
                            context.beginPath();
                            points.forEach(([x, y, isDraw]) => {
                                if (!isDraw) {
                                    context.moveTo(x, y)
                                    context.moveTo(x, y)
                                } else {
                                    context.lineTo(x, y)
                                }
                            })
                            // }
                            // )
                            // context.quadraticCurveTo(150, 100, 260, 170);
                            // context.closePath();
                            // (!) Konva specific method, it is very important
                            context.fillStrokeShape(shape);
                        }
                        }
                        // fill="#00D2FF"
                        stroke="black"
                        strokeWidth={1}
                    />
                </Layer>
            </Stage>
        </div>
    );
}

export default App;
