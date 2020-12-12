import {SwapiServiceConsumer} from "../swapi-service-context";
import ItemDetails from "../item-details";
import {Record} from "../item-details/item-details";

const PersonDetails = ({itemId}) => {
  return(
    <SwapiServiceConsumer>
      {
        ({getPerson, getPersonImage}) => {
          return(
            <ItemDetails
              itemId={itemId}
              getData={getPerson}
              getImageUrl={getPersonImage}>

              <Record field="birthYear" label="Birth Year" />
              <Record field="gender" label="Gender" />
              <Record field="eyeColor" label="Eye Color" />
            </ItemDetails>
          );
        }
      }
    </SwapiServiceConsumer>
  );
};

export default PersonDetails;
