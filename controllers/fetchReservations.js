module.exports = async function fetchReservations() {
    return await Event.find({
        status: 'reserved',
        eventDate: { $gte: new Date().setHours(0, 0, 0, 0) },
    });
};
