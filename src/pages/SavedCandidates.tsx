import { useEffect, useState } from 'react';
import { Candidate } from '../interfaces/Candidate.interface'; // Ensure this is the correct path

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>(() => {
    const storedCandidates = localStorage.getItem('savedCandidates');
    return storedCandidates ? JSON.parse(storedCandidates) : [];
  });

  useEffect(() => {
    localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates)); // Update local storage on change
  }, [savedCandidates]);

  const handleReject = (id: number) => {
    console.log(`Rejected candidate with id: ${id}`);
    setSavedCandidates((prev) => prev.filter(candidate => candidate.id !== id)); // Remove rejected candidate
  };

  return (
    <div>
      <h1>Potential Candidates</h1>
      {savedCandidates.length > 0 ? (
        savedCandidates.map((candidate) => (
          <div className="saved-candidate-card" key={candidate.id}>
            <img src={candidate.avatar_url} alt={`${candidate.login}'s avatar`} />
            <h2>{candidate.login}</h2>
            {candidate.location && <p>Location: {candidate.location}</p>}
            {candidate.email && <p>Email: {candidate.email}</p>}
            {candidate.company && <p>Company: {candidate.company}</p>}
            <button onClick={() => handleReject(candidate.id)}>-</button>
          </div>
        ))
      ) : (
        <p>No potential candidates available</p>
      )}
    </div>
  );
};

export default SavedCandidates;
