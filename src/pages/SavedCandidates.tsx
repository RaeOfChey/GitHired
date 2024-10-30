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
      <h1>Potential Candidates</h1>
      {savedCandidates.length === 0 ? (
        <p>No potential candidates available</p>
      ) : (
        <ul>
          {savedCandidates.map((candidate) => (
            <li key={candidate.id}> {/* Ensure id is unique */}
              <img src={candidate.avatar_url} alt={candidate.login} />
              <h2>{candidate.login}</h2>
              <p>Location: {candidate.location}</p>
              <p>Email: {candidate.email}</p>
              <p>Company: {candidate.company}</p>
              <p>Bio: {candidate.bio}</p>
              <button onClick={() => handleReject(candidate.id)}>Reject</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedCandidates;
