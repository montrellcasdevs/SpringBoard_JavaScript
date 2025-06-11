const emblemClue1 = "Eagle";
const emblemClue2 = "Laurel";
const emplemClue3 = 7;
locationStart = "";

//Step1

if(emblemClue1 == "Eagle"){
    locationStart = "Form";
}else if(emblemClue1 == "Lion"){
        locationStart = "Colosseum"
}else{
    locationStart = "Villa";
}
//Step2
if(emblemClue2 == "Laurel" && locationStart == "Forum"){
    locationStart+="Augustus";
}else if(emblemClue2 == "Grapes" || emblemClue2 == "Villa"){
    locationStart += "Pompey";
}
//Step3

switch(emplemClue3){
    case 7:
        locationStart += "North";
        break;
    case 3:
        locationStart += "South";
        break;
    case 9:
        locationStart += "East";
        break;
    case 4:
        locationStart += "West";
        break;
}