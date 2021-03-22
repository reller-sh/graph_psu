import { Layer, Shape, Stage } from "react-konva";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

const p = [[10, 10, false], [10, 50, false], [100, 20, true], [150, 50, true]]

function App() {
    const {register, handleSubmit, watch} = useForm({
        defaultValues: {
            size_x: 1,
            rotate: 0,
            glass: false
        }
    });

    const {rotate, glass, size_x} = watch()

    const [points, setPoints] = useState([[10, 10, false, 1], [10, 50, false, 1], [100, 20, true, 1], [150, 50, true, 1]]);

    useEffect(() => {
        setPoints([...p.map(([x, y, isDraw, thirdParty]) => {
            const g = Math.PI * (rotate) / 180
            console.log(points, g);
            const nx = (x * Math.cos(g) + y * Math.sin(g))
            const ny = x * -Math.sin(g) + y * Math.cos(g)
            return [nx, ny, isDraw, thirdParty]
        })])
        // eslint-disable-next-line
    }, [rotate])

    useEffect(() => {
        setPoints(s => [...s.map(([x, y, isDraw, thirdParty]) => {
            if (glass) {
                const g = Math.PI
                const nx = (x * Math.cos(g) + y * Math.sin(g) + 400)
                const ny = x * -Math.sin(g) + y * Math.cos(g) + 400
                return [nx, ny, isDraw]
            } else
                return [x, y, isDraw, thirdParty]
        })])
    }, [glass])

    useEffect(() => {
        setPoints([...p.map(([x, y, isDraw, thirdParty]) => {
                const nx = x * size_x
                return [nx, y, isDraw, thirdParty]
        })])
    }, [size_x])

    return (
        <div className="App">
            <div onSubmit={handleSubmit(() => {
            })}>
                Увеличение по x: {'  '}
                <input ref={register()} name='size_x' step={0.02} min={0.01} type="number"/>
                <br/>
                Поворот: {'  '}
                <input ref={register()} name='rotate' type="number"/>
                Отражение: {'  '}
                <input ref={register()} name='glass' type='checkbox'/>
            </div>
            <Stage height={'2000'} width={'2000'}>
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
