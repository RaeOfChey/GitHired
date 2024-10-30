import { useEffect, useState } from 'react'; // Only import hooks
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentCandidateIndex, setCurrentCandidateIndex] = useState<number>(0);

  const fetchCandidates = async () => {
    try {
      const response = await fetch('https://api.github.com/users', {
        method: 'GET',
        headers: {
          'Authorization': `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      });
      console.log('Response Status:', response.status);
      console.log('Response Headers:', response.headers);
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data: Candidate[] = await response.json();
      setCandidates(data);
    } catch (error) {
      console.error('Error fetching candidates:', error);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const handleSave = () => {
    const savedCandidate = candidates[currentCandidateIndex];
    console.log(`Saved candidate:`, savedCandidate);
    nextCandidate();
  };

  const handleReject = (id: number) => {
    console.log(`Rejected candidate with id: ${id}`);
    nextCandidate();
  };

  const nextCandidate = () => {
    setCurrentCandidateIndex((prevIndex: number) => {
      if (prevIndex < candidates.length - 1) {
        return prevIndex + 1;
      } else {
        alert('No more candidates available');
        return prevIndex; // Stay on the last candidate
      }
    });
  };

  const currentCandidate = candidates[currentCandidateIndex];

  return (
    <div>
      <h1>Candidate Search</h1>
      {currentCandidate ? (
        <div className="candidate-card">
          <img src={currentCandidate.avatar_url} alt={`${currentCandidate.login}'s avatar`} />
          <h2>{currentCandidate.login}</h2>
          {currentCandidate.location && <p>Location: {currentCandidate.location}</p>}
          {currentCandidate.email && <p>Email: {currentCandidate.email}</p>}
          {currentCandidate.company && <p>Company: {currentCandidate.company}</p>}
          {currentCandidate.bio && <p>Bio: {currentCandidate.bio}</p>}
          <button onClick={handleSave}>+</button>
          <button onClick={() => handleReject(currentCandidate.id)}>-</button>
        </div>
      ) : (
        <p>No more candidates available</p>
      )}
    </div>
  );
};

export default CandidateSearch;
