let userData = require("../userData.json")
let size = Object.keys(userData).length;
console.log(size);

//{get method} ==> /user/all
module.exports.getAllUser = (req, res) => {
    const {
        limit
    } = req.query;
    res.send(userData.slice(0, limit));
}

//{get method} /user/random
module.exports.getRandomUser = (req, res) => {
    let random = Math.random() * size + 1;
    //console.log(Math.floor(random));
    res.send(userData.find(user => user.id == Number(Math.floor(random))));

}


//post method===> /user/save
module.exports.saveUser = (req, res) => {
    let userData_keys = ['address', 'contact', 'gender', 'id', 'name',
        'photoUrl'
    ];

    size++;
    let info = req.body;
    info.id = size;
    userData.push(info)

    var bKeys = Object.keys(info).sort();

    if (JSON.stringify(bKeys) == JSON.stringify(userData_keys)) {
        res.send(userData);
    } else {
        res.send("Please fill all requirement");
    }
    //test ever tryed
    //console.log(bKeys.includes(userData_keys.sort()));
    //var aKeys = Object.keys(userData).sort();
    //console.log(Object.keys(userData.keys))
    //console.log(JSON.stringify(userData));
    //console.log(userData_keys);

}

module.exports.updateUser = (req, res) => {
    const {
        id
    } = req.params;
    // console.log(size)
    if (id <= size) {
        const newData = userData.find(user => user.id == Number(id));
        newData.id = id;
        newData.name = req.body.name;
        newData.address = req.body.address;
        newData.contact = req.body.contact;
        newData.gender = req.body.gender;
        newData.photoUrl = req.body.photoUrl;
        res.send(newData);
    } else {
        res.send("ID Out of Range")
    }

}

module.exports.bulkUpdate = (req, res) => {
        let store = [];
        let updateInfo = req.body;

        updateInfo.map(single => {
            if (single.id <= size) {
                const newDatas = userData.find(user => user.id == Number(single.id));
                newDatas.name = single.name;
                newDatas.address = single.address;
                newDatas.contact = single.contact;
                newDatas.gender = single.gender;
                newDatas.photoUrl = single.photoUrl;
                store.push(newDatas);
            } else {
                res.send("ID Out of Range")
            }

        });
  
         res.send(store)

}

module.exports.deleteUser=(req,res)=>{
    const {id} = req.params;
  if(id<=size){
    userData = userData.filter(user=>user.id != Number(id));
    res.send(userData);
  }else{
    res.send("ID out of size");
  }

}