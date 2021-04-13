import { Layer, Shape, Stage } from "react-konva";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

const p = [
    [159, 156, 1, false],
    [159, 100, 1, true],
    [180, 100, 1, true],
    [180, 145, 1, true],
    [220, 125, 1, false],
    [130, 170, 1, true],
    [130, 270, 1, true],
    [310, 270, 1, true],
    [310, 170, 1, true],
    [130, 170, 1, true],
    [220, 125, 1, true],
    [310, 170, 1, true],
    [235, 210, 1, false],
    [205, 210, 1, true],
    [205, 240, 1, true],
    [235, 240, 1, true],
    [235, 210, 1, true],

    // pattern:
    [0, 0, 1, false],
]

const reflection = [
    [-1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
]

const resizer_matrix = (r) => [
    [r, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
]


const rotate_matrix = (deg) => ([
    [Math.cos(deg), Math.sin(deg), 0],
    [-Math.sin(deg), Math.cos(deg), 0],
    [0, 0, 1],
])

const multiplyMatrix = (A, B) => {
    let i;
    let rowsA = A.length, colsA = A[0].length,
        rowsB = B.length, colsB = B[0].length,
        C = [];

    if (colsA !== rowsB) return false;

    for (i = 0; i < rowsA; i++) C[i] = [];

    for (let k = 0; k < colsB; k++) {
        for (i = 0; i < rowsA; i++) {
            let temp = 0;
            for (let j = 0; j < rowsB; j++) temp += A[i][j] * B[j][k];
            C[i][k] = temp;
        }
    }
    return C;
}

const middle = (f, s) => [...multiplyMatrix([...f.map(([x, y, n]) => [x, y, n])], s)
    .map(([x, y, n], index) => [x, y, n, f[index][3]])]

function App() {
    const {register, handleSubmit, watch} = useForm({
        defaultValues: {
            size_x: 1,
            rotate: 0,
            glass: false
        }
    });

    const {rotate, size_x} = watch()

    const [points, setPoints] = useState([...p]);

    const rotation = () => {
        setPoints(s => middle(s, rotate_matrix(Math.PI * (rotate) / 180)))
    }

    const glassing = () => {

        setPoints(s => middle(s, reflection))
    }

    useEffect(() => console.log(points), [points])
    useEffect(() => console.log(rotate_matrix(rotate)), [rotate])


    const resizer = () => {

        setPoints(s => middle(s, resizer_matrix(size_x)))
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
                <br/>
                Вернуть к истокам: {'  '}
                <input ref={register()} name='glass' type='checkbox' onChange={() => setPoints([...p])}/>
            </div>
            <Stage height={900} width={1920}>
                <Layer>
                    <Shape
                        sceneFunc={(context, shape) => {
                            context.beginPath();
                            points.forEach(([x, y, _, isDraw]) => {
                                if (!isDraw) {
                                    context.moveTo(x, y)
                                    context.moveTo(x, y)
                                } else {
                                    context.lineTo(x, y)
                                }
                            })
                            context.fillStrokeShape(shape);
                        }
                        }

                        stroke="black"
                        strokeWidth={1}
                    />
                </Layer>
            </Stage>
        </div>
    );
}

export default App;
