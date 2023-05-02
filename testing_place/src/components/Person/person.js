// import required dependencies
import {useEffect, useState} from "react";
import SwService from "../../services/sw-service";

function Person() {
    const [person, setPerson] = useState({});
    // initial character id value
    const [personId, setPersonId] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [buttonOff, setButtonOff] = useState(false);

    // start getting data for the first character when the component is loaded
    useEffect(() => {
        getPersonData(personId);
    }, [personId]);

    const getPersonData = async (id) => {
        setIsLoading(true);
        try {
            // get character data from API
            const personData = await SwService.getPerson(id);
            // update the state of the character with the received data
            setPerson(personData);
            setIsLoading(false);
        } catch (error) {
            // if an error occurred when receiving a character, then immediately switch to another character
            setPersonId(prevPersonId => prevPersonId < 84 ? prevPersonId + 1 : prevPersonId);
            console.error(`Error fetching person ${id}`, error);
            setIsLoading(false);
        }
    };

    const handleNextClick = () => {
        setPersonId(prevPersonId  => prevPersonId + 1);
        // if personId is greater than the number of characters disable the button
        personId > 82 ? setButtonOff(true) : setButtonOff(false);
    };

    return (
        <div>
            <img src={person.image} alt={person.name} />
            <h3>{person.name}</h3>
            <ul>
                <li>Gender: {person.gender}</li>
                <li>Birth year: {person.birthYear}</li>
                <li>Eye color: {person.eyeColor}</li>
            </ul>
            <button onClick={handleNextClick} disabled={isLoading || buttonOff }> {isLoading ? "Loading..." : "NEXT"}</button>
        </div>
    );
}

export default Person;
