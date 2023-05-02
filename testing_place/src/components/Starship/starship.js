// import required dependencies
import {useEffect, useState} from "react";
import SwService from "../../services/sw-service";

function Starship() {
    const [starship, setStarship] = useState({});
    // initial starship id value
    const [starshipId, setStarshipId] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [buttonOff, setButtonOff] = useState(false);
    const [starshipImage, setStarshipImage] = useState('');
    // start getting data for the first starship when the component is loaded
    useEffect(() => {
        getStarshipData(starshipId);
    }, [starshipId]);

    const getStarshipData = async (id) => {
        setIsLoading(true);
        try {
            // get starship data from API
            const starshipData = await SwService.getStarships(id);
            // update the state of the starship with the received data
            setStarship(starshipData);
            setStarshipImage(starshipData.image);
            setIsLoading(false);
        } catch (error) {
            // if an error occurred when receiving a starship, then immediately switch to another starship
            setStarshipId(prevStarshipId => prevStarshipId < 84 ? prevStarshipId + 1 : prevStarshipId);
            console.error(`Error fetching Starship ${id}`, error);
            setIsLoading(false);
        }
    };
    const imageError = () => {
        setStarshipImage('https://starwars-visualguide.com/assets/img/big-placeholder.jpg');
    };
    const handleNextClick = () => {
        setStarshipId(prevStarshipId  => prevStarshipId + 1);
        // if starshipId is greater than the number of starship disable the button
        starshipId > 73 ? setButtonOff(true) : setButtonOff(false);
    };
    return (
        <div className='container'>
            <button onClick={handleNextClick} disabled={isLoading || buttonOff }> {isLoading ? "Loading..." : "NEXT"}</button>
            <img src={starshipImage} alt={starship.name} onError={imageError} />
            <h3>{starship.name}</h3>
            <ul>
                <li>Model: {starship.model}</li>
                <li>Length: {starship.length}</li>
                <li>Passengers: {starship.passengers}</li>
            </ul>
        </div>
    );
}

export default Starship;
