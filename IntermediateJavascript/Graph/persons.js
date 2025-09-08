
class PersonNode{
    constructor(name, adjacent = new Set()) { //adjacent is a collection
        this.name = name;
        this.adjacent = adjacent;//adjacent is a SET collection 
    }
}   
    
class FriendGraph{
        constructor(){
            this.nodes = new Set(); //node is a collection
        }
        addPerson(node){ //takes the node collection
            this.nodes.add(node) //use the collection add method to add to the node.
        }
        addPeople(peopleList){
            for(let node of peopleList){
                this.addPerson(node);
            }
        }
        setFriends(person1, person2){
            person1.adjacent.add(person2);
            person2.adjacent.add(person1);
        }
        areConnected(person1,person2){
            let toVisitQueue = [person1];
            let seen = new Set(toVisitQueue);
            while (toVisitQueue.length) {
                let current = toVisitQueue.shift();
                if (current === person2) {
                    return true;
                }
                for (let neighbor of current.adjacent) {
                    if (!seen.has(neighbor)) {
                        toVisitQueue.push(neighbor);
                    }
                }
            }
            return false;
        }
        areConnectedRecursive(person1, person2, seen = new Set([person1])) {
          for(let neighbor of person1.adjacent){
            if(!seen.has(neighbor)){
                seen.add(neighbor);
              if(this.areConnectedRecursive(neighbor, person2, seen)){
                return true;
              }
          }
        }
        return false;
   }

}

const homer = new PersonNode("Homer Simpson");
const marge = new PersonNode("Marge Simpson");
const bart = new PersonNode("Bart Simpson");
const lisa = new PersonNode("Lisa Simpson");
const maggie = new PersonNode("Maggie Simpson");

const friends = new FriendGraph();
friends.addPeople([homer, marge, bart, lisa, maggie]);
friends.setFriends(homer, marge);
friends.setFriends(bart, lisa);

const moe = new PersonNode('moe');
const barney = new PersonNode('barney');
const lenny = new PersonNode('lenny');
friends.addPeople([moe, barney, lenny]);
friends.setFriends(moe, barney);
friends.setFriends(lenny, bart);
