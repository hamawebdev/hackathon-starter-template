import React, { useState, useEffect } from 'react';

const TeamForm = () => {
  // State for team details.
  const [teamName, setTeamName] = useState('');
  const [matricule, setMatricule] = useState('');
  // Leader id comes from localStorage.
  const [leaderId, setLeaderId] = useState(null);
  // State for team members – each member now holds an object with memberId, fullName, email, and phone.
  const [members, setMembers] = useState([
    { memberId: '', fullName: '', email: '', phone: '' },
  ]);

  // Retrieve leader_id from localStorage on mount.
  useEffect(() => {
    const storedLeaderId = localStorage.getItem('leader_id');
    if (storedLeaderId) {
      setLeaderId(storedLeaderId);
    }
  }, []);

  // Handle changes for a team member field.
  const handleMemberChange = (index, field, value) => {
    const newMembers = [...members];
    newMembers[index][field] = value;
    setMembers(newMembers);
  };

  // Add a new team member entry.
  const addMemberField = () => {
    setMembers([...members, { memberId: '', fullName: '', email: '', phone: '' }]);
  };

  // Remove a team member entry.
  const removeMemberField = (index) => {
    const newMembers = members.filter((_, i) => i !== index);
    setMembers(newMembers);
  };

  // Handle form submission.
  const handleSubmit = (e) => {
    e.preventDefault();
    const teamData = {
      teamName,
      matricule,
      leader_id: leaderId,
      members: members.filter(
        (member) =>
          member.memberId.trim() !== '' ||
          member.fullName.trim() !== '' ||
          member.email.trim() !== '' ||
          member.phone.trim() !== ''
      ),
    };

    // Replace this console.log with your actual API call.
    console.log('Submitting team data:', teamData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg"
    >
      <h2 className="text-3xl font-bold text-center mb-6">Create New Team</h2>

      {/* Team Details Section */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-4">Team Details</h3>
        <div className="mb-4">
          <label htmlFor="teamName" className="block text-gray-700 font-medium mb-2">
            Team Name:
          </label>
          <input
            type="text"
            id="teamName"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Enter team name"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label htmlFor="matricule" className="block text-gray-700 font-medium mb-2">
            Matricule:
          </label>
          <input
            type="text"
            id="matricule"
            value={matricule}
            onChange={(e) => setMatricule(e.target.value)}
            placeholder="Enter unique matricule"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Team Members Section */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-4">Team Members</h3>
        {members.map((member, index) => (
          <div
            key={index}
            className="mb-4 p-4 border border-gray-200 rounded-md shadow-sm"
          >
            <div className="mb-4">
              <label htmlFor={`memberId-${index}`} className="block text-gray-700 font-medium mb-2">
                Member ID:
              </label>
              <input
                type="text"
                id={`memberId-${index}`}
                value={member.memberId}
                onChange={(e) => handleMemberChange(index, 'memberId', e.target.value)}
                placeholder="Enter member ID"
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="mb-4">
              <label htmlFor={`fullName-${index}`} className="block text-gray-700 font-medium mb-2">
                Full Name:
              </label>
              <input
                type="text"
                id={`fullName-${index}`}
                value={member.fullName}
                onChange={(e) => handleMemberChange(index, 'fullName', e.target.value)}
                placeholder="Enter full name"
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="mb-4">
              <label htmlFor={`email-${index}`} className="block text-gray-700 font-medium mb-2">
                Email:
              </label>
              <input
                type="email"
                id={`email-${index}`}
                value={member.email}
                onChange={(e) => handleMemberChange(index, 'email', e.target.value)}
                placeholder="Enter email address"
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="mb-4">
              <label htmlFor={`phone-${index}`} className="block text-gray-700 font-medium mb-2">
                Phone:
              </label>
              <input
                type="tel"
                id={`phone-${index}`}
                value={member.phone}
                onChange={(e) => handleMemberChange(index, 'phone', e.target.value)}
                placeholder="Enter phone number"
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <button
              type="button"
              onClick={() => removeMemberField(index)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
            >
              Remove Member
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addMemberField}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
        >
          Add Member
        </button>
      </div>

      {/* Optionally display leader id (the logged-in user) */}
      {leaderId && (
        <div className="mb-6">
          <p className="text-gray-600">
            <strong>Leader ID:</strong> {leaderId}
          </p>
        </div>
      )}

      <div className="text-center">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md font-semibold"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default TeamForm;
