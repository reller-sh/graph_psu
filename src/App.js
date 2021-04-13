import { Image, Layer, Stage } from "react-konva";
import useImage from "use-image";



function App() {

    const [image] = useImage('/back.svg');

    return (
        <div className="App">
            <Stage height={900} width={1920}>
                <Layer>
                    <Image image={image} draggable={true} />
                </Layer>
            </Stage>
        </div>
    );
}

export default App;
