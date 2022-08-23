import { useContext } from 'react';
import Line from './Line';
import BackContext from '../BackContext';

function List() {

    const { ideas } = useContext(BackContext);

    return (
        <div className="card mt-4">
            <div className="card-header">
                <h2>List of Meisters</h2>
            </div>
            <div className="card-body">

                <ul className="card-header">
                    <b style={{ paddingRight: "9%" }}>Meistras</b>
                    <b style={{ padding: "3%" }}>Vardas</b>
                    <b style={{ padding: "3%" }}>Pavarde</b>
                    <b style={{ padding: "3%" }}>Specelybe</b>
                    <b style={{ padding: "3%" }}>servisas</b>
                    <b style={{ padding: "3%" }}>miestas</b>
                    <b style={{ padding: "5%" }}>Photo</b>
                </ul>
                <ul className="list-group">
                    {
                        ideas ? ideas.map(p => <Line key={p.id} line={p}></Line>) : null
                    }
                </ul>
            </div>
        </div>
    );
}

export default List;