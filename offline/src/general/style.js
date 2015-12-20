function FillColor(feature) {
  var woodColor = "#7FDD4C",
      waterColor = "#74D0F1",
      parkingColor = "#FFFF6B",
      universiteColor = "#E32636",
      administrationColor = "#884DA7",
      restaurantColor = "#357AB7",
      residenceColor = "#723E64",
      otherBuildingColor = "#985717",
      otherColor = "white",
      way = "red";



  if(feature.hasOwnProperty("properties")){
    // FORET OU EAU
    if (feature.properties.hasOwnProperty("natural")){
      if (feature.properties.natural == "wood"){
        return woodColor;
      }
      else if(feature.properties.natural == "water"){
        return waterColor;
      }
    }
    if (feature.properties.hasOwnProperty("wood")){
      return woodColor;
    }


    // PARKING
    if (feature.properties.hasOwnProperty("parking")){
      return parkingColor;
    }


    // BATIMENT
    if (feature.properties.hasOwnProperty("building")){
      if(feature.properties.building != "yes" && feature.properties.hasOwnProperty("name")) {

        // UNIVERSITE
        if (feature.properties.building == "Universite"){
          return universiteColor;
        }
        // ADMINISTRATION
        else if(feature.properties.building == "Administration") {
          return administrationColor;
        }
        // RESTAURANT
        else if(feature.properties.building == "Restaurant") {
          return restaurantColor;
        }
        // RESIDENCE
        else if(feature.properties.building == "Residence") {
          return residenceColor;
        }
      }
      // BATIMENT INCONNU
      else {
        return otherBuildingColor;
      }
    }

  }

  // AUTRE
  return otherColor;
}

function FillOpacity(feature) {
  if(feature.hasOwnProperty("properties")){
    if (feature.properties.hasOwnProperty("natural") ||
      feature.properties.hasOwnProperty("building") ||
      feature.properties.hasOwnProperty("parking") ||
      feature.properties.hasOwnProperty("wood")
    ){
      return 1;
  }
}
return 0.1;
}

function color(feature) {
  return '#677179';
}

function style(feature) {
  return {
    fillColor: FillColor(feature),
    weight: 1.5,
    opacity: 1,
    color: color(feature),
    dashArray: '2',
    fillOpacity: FillOpacity(feature)
  };
}
