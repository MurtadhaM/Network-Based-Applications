/**
 * @author: Murtadha Marzouq
 * @description: If you reach this page, you must be drunk
 */
const notFound = (req, res) => res.status(404).send('Route does not exist')
module.exports = notFound
