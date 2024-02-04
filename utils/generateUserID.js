// create a function to generate unique user id
function generateUserId() {
    const userId = Math.floor(Math.random() * 1000000);
    return userId;
}
module.exports = generateUserId;