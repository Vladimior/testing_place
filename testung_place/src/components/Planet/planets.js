// import required dependencies
import {useEffect, useState} from "react";
import SwService from "../../services/sw-service";

function Planet() {
    const [planet, setPlanet] = useState({});
    // initial planet id value
    const [planetId, setPlanetId] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [buttonOff, setButtonOff] = useState(false);
    const [planetImage, setPlanetImage] = useState('');
    // start getting data for the first planet when the component is loaded
    useEffect(() => {
        getPlanetData(planetId);
    }, [planetId]);

    const getPlanetData = async (id) => {
        setIsLoading(true);
        try {
            // get planet data from API
            const planetData = await SwService.getPlanets(id);
            // update the state of the planet with the received data
            setPlanet(planetData);
            setPlanetImage(planetData.image);
            setIsLoading(false);
        } catch (error) {
            // if an error occurred when receiving a planet, then immediately switch to another planet
            setPlanetId(prevPlanetId => prevPlanetId < 84 ? prevPlanetId + 1 : prevPlanetId);
            console.error(`Error fetching planet ${id}`, error);
            setIsLoading(false);
        }
    };
    const imageError = () => {
        setPlanetImage('https://starwars-visualguide.com/assets/img/big-placeholder.jpg');
    };
    const handleNextClick = () => {
        setPlanetId(prevPlanetId  => prevPlanetId + 1);
        // if planetId is greater than the number of planet disable the button
        planetId > 58 ? setButtonOff(true) : setButtonOff(false);
    };
    return (
        <div>
            <img src={planetImage} alt={planet.name} onError={imageError} />
            <h3>{planet.name}</h3>
            <ul>
                <li>climate: {planet.climate}</li>
                <li>gravity: {planet.gravity}</li>
                <li>terrain: {planet.terrain}</li>
            </ul>
            <button onClick={handleNextClick} disabled={isLoading || buttonOff }> {isLoading ? "Loading..." : "NEXT"}</button>
        </div>
    );
}

export default Planet;
