const TwanComponent = () => {

    const name = "Hoi Dan IT";
    const age = 25;

    const info = {
        name: "Twan",
        age: 25
    }

    return (
        <div>
            <h1>Hello: Ten {name} Tuoi {age}</h1>
            <h1>Hello: Ten {info.name} Tuoi {info.age}</h1>
            <img 
                src="https://i.imgur.com/yXOvdOSs.jpg" 
                alt="Hedy Lamarr" 
                className="photo"
            />
            <ul>
                <li>Invent new traffic lights </li>
                <li>Rehearse a movie scene </li>
                <li>Improve the spectrum technology </li>
            </ul>
        </div>
    )
}

export default TwanComponent