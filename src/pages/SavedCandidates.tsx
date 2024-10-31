// SavedCandidates.tsx
import React, { useEffect, useState } from 'react';
import { Candidate as CandidateType } from '../interfaces/Candidate.interface';

const SavedCandidates: React.FC = () => {
  const [savedCandidates, setSavedCandidates] = useState<CandidateType[]>([]);

  useEffect(() => {
    const storedCandidates = localStorage.getItem('potentialCandidates');
    if (storedCandidates) {
      setSavedCandidates(JSON.parse(storedCandidates));
    }
  }, []);

  // Function to remove a candidate
  const handleReject = (candidateId: number) => {
    const updatedCandidates = savedCandidates.filter(
      candidate => candidate.id !== candidateId
    );
    setSavedCandidates(updatedCandidates);
    localStorage.setItem('potentialCandidates', JSON.stringify(updatedCandidates));
  };

  return (
    <div>
      <h1 className="centered-heading">Potential Candidates</h1>
      {savedCandidates.length === 0 ? (
        <p>No potential candidates available</p>
      ) : (
        <table className="candidate-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Location</th>
              <th>Email</th>
              <th>Company</th>
              <th>Bio</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
            {savedCandidates.map((candidate) => (
              <tr key={candidate.id}>
                <td>
                  <img className="saved-candidate-image" src={candidate.avatar_url} alt={candidate.login} width="50" />
                </td>
                <td>{candidate.login}</td>
                <td>{candidate.location || 'N/A'}</td>
                <td>{candidate.email || 'N/A'}</td>
                <td>{candidate.company || 'N/A'}</td>
                <td>{candidate.bio || 'N/A'}</td>
                <td className="reject-column">
                  <button className="reject-button" onClick={() => handleReject(candidate.id)}>-</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SavedCandidates;
