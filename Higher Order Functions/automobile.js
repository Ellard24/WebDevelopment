/**
 * Created by Ellard Gerritsen van der Hoop on 1/26/2016.
 * Description: Sorts the array of automobiles from greatest to least based on chosen
 *              comparator and then displays in console the results
 * Input: No input during runtime
 * Output: Displays sorted array of automobiles depending on comparator
 */
function Automobile( year, make, model, type ){
    this.year = year; //integer (ex. 2001, 1995)
    this.make = make; //string (ex. Honda, Ford)
    this.model = model; //string (ex. Accord, Focus)
    this.type = type; //string (ex. Pickup, SUV)
}

var automobiles = [
    new Automobile(1995, "Honda", "Accord", "Sedan"),
    new Automobile(1990, "Ford", "F-150", "Pickup"),
    new Automobile(2000, "GMC", "Tahoe", "SUV"),
    new Automobile(2010, "Toyota", "Tacoma", "Pickup"),
    new Automobile(2005, "Lotus", "Elise", "Roadster"),
    new Automobile(2008, "Subaru", "Outback", "Wagon")
];

/*This function sorts arrays using an arbitrary comparator. You pass it a comparator and an array of objects appropriate for that comparator and it will return a new array which is sorted with the largest object in index 0 and the smallest in the last index*/
function sortArr( comparator, array ){

    var sortedArr = new Automobile;

    //Using a Selection Sort. Not the most efficient but fine for the size of the array.
    for (var i = 0; i < array.length; i++)
    {
        var min = i;

        for (var j = i+1; j < array.length; j++)
        {

            if (comparator(array[j],array[min]))
            {

                min = j;


            }
        }

        var temp = array[i];

        array[i] = array[min];

        array[min] = temp;

    }

    return sortedArr;

}

/*A comparator takes two arguments and uses some algorithm to compare them. If the first argument is larger or greater than the 2nd it returns true, otherwise it returns false. Here is an example that works on integers*/
function exComparator( int1, int2){
    if (int1 > int2){
        return true;
    } else {
        return false;
    }
}

/*For all comparators if cars are 'tied' according to the comparison rules then the order of those 'tied' cars is not specified and either can come first*/

/*This compares two automobiles based on their year. Newer cars are "greater" than older cars.*/
function yearComparator( auto1, auto2){

    if (auto1.year > auto2.year)
        return true;
    else
        return false;

}

/*This compares two automobiles based on their make. It should be case insensitive and makes which are alphabetically earlier in the alphabet are "greater" than ones that come later.*/
function makeComparator( auto1, auto2){

    var car1 = auto1.make.toLowerCase();
    var car2 = auto2.make.toLowerCase();


    if(car1 > car2)
        return true;
    else
        return false;


}

/*This compares two automobiles based on their type. The ordering from "greatest" to "least" is as follows: roadster, pickup, suv, wagon, (types not otherwise listed). It should be case insensitive. If two cars are of equal type then the newest one by model year should be considered "greater".*/
function typeComparator( auto1, auto2){
    //roadster = 5 ,pickup = 4, suv = 3, wagon = 2 everything else = 0

    var car1;
    var car2;

    if (auto1.type == "Roadster")
        car1 = 5;
    else if (auto1.type == "Pickup")
        car1 = 4;
    else if (auto1.type == "SUV")
        car1 = 3;
    else if (auto1.type == "Wagon")
        car1 = 2;
    else
        car1 = 0;

    if (auto2.type == "Roadster")
        car2 = 5;
    else if (auto2.type == "Pickup")
        car2 = 4;
    else if (auto2.type == "SUV")
        car2 = 3;
    else if (auto2.type == "Wagon")
        car2 = 2;
    else
        car2 = 0;


    if (car1 > car2)
        return true;
    else if (car1 == car2)
    {
        if (auto1.year > auto2.year)
        {
            return true;
        }
        else
            return false;
    }
    else
        return false;




}


Automobile.prototype.logMe = function(boolinput)
{

    if (boolinput == true)
        console.log(this.year, this.make, this.model,this.type);

    if (boolinput == false)
        console.log(this.year, this.make, this.model);

}

console.log("*****");
console.log("The cars sorted by year are:");
sortArr(yearComparator, automobiles);

automobiles.forEach( function(object)
{
    object.logMe(false);
});

console.log("The cars sorted by make are:");
sortArr(makeComparator, automobiles);
automobiles.forEach( function(object)
{
    object.logMe(false);
});

console.log("The cars sorted by type are:");
sortArr(typeComparator, automobiles);
automobiles.forEach( function(object)
{
    object.logMe(true);
});


console.log("*****");
