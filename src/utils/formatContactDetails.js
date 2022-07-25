const formatContactDetails = (contact) => {
  return {
    id: contact.id,
    email: contact.email,
    number: contact.number,
    firstName: contact.profile.firstName,
    lastName: contact.profile.lastName,
  };
};

module.exports = formatContactDetails;
