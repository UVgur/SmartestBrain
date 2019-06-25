const handleProfileGet = (req,res,mydb) => {
  const { id } = req.params;
  mydb.select('*').from('users').where({id})
    .then(user => {
    if (user.length) {
     res.json(user[0])
    } else {
    res.status(400).json('Not Found')
    }
    })
    .catch(err => res.status(400).json('error getting user'))
  };


const handleProfileUpdate = (req, res, db) =>
{
  const { id } = req.params;
  const { name, age, pet } = req.body.formInput;

  db('users').where({ id }).update(
    { name: name,
    age:age,
    pet: pet
    }).then(res =>
    {
    if (res) {
      res.json("success")
    } else {res.status(400).json('Not found')}
   }).catch(err => res.status(400).json('error updating user'))
};


module.exports = {
  handleProfileGet,
  handleProfileUpdate
};