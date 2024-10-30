import React, { useEffect, useState } from 'react';
import { Candidate as CandidateType } from '../interfaces/Candidate.interface';

const CandidateSearch: React.FC = () => {
  const [candidates, setCandidates] = useState<CandidateType[]>([]);
  const [currentCandidateIndex, setCurrentCandidateIndex] = useState<number>(0);
  const [savedCandidates, setSavedCandidates] = useState<CandidateType[]>([]);
  const [error, setError] = useState<string | null>(null); // Error state

  // Load saved candidates from local storage on component mount
  useEffect(() => {
    const storedCandidates = localStorage.getItem('potentialCandidates');
    if (storedCandidates) {
      setSavedCandidates(JSON.parse(storedCandidates));
    }
  }, []);

// Fetch candidates from GitHub API
const fetchCandidates = async () => {
  try {
    const response = await fetch('https://api.github.com/users'); // You can change this to a more specific endpoint
    if (!response.ok) {
      throw new Error('Failed to fetch candidates');
    }
    const data: CandidateType[] = await response.json();
    setCandidates(data);
  } catch (err) {
    // Use a type assertion to tell TypeScript that 'err' is an instance of 'Error'
    const error = err as Error; // Type assertion
    setError(error.message); // Now TypeScript recognizes 'error' as having a 'message' property
  }
};

  useEffect(() => {
    fetchCandidates(); // Call the function to fetch candidates
  }, []);

  // Function to save candidate
  const handleSaveCandidate = (candidate: CandidateType) => {
    const isAlreadySaved = savedCandidates.some(saved => saved.id === candidate.id);

    if (!isAlreadySaved) {
      const updatedCandidates = [...savedCandidates, candidate];
      setSavedCandidates(updatedCandidates);
      localStorage.setItem('potentialCandidates', JSON.stringify(updatedCandidates));
    }
    nextCandidate(); // Move to the next candidate after saving
  };

  // Function to go to the next candidate
  const nextCandidate = () => {
    setCurrentCandidateIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex < candidates.length ? nextIndex : prevIndex; // Stay on last candidate if none left
    });
  };

  // Get the current candidate based on the index
  const currentCandidate = candidates[currentCandidateIndex];

  return (
    <div>
      <h1>Candidate Search</h1>
      {error && <p>Error: {error}</p>} {/* Display any errors */}
      {currentCandidate ? (
        <div>
          <img src={currentCandidate.avatar_url} alt={currentCandidate.login} />
          <h2>{currentCandidate.login}</h2>
          <p>Location: {currentCandidate.location}</p>
          <p>Email: {currentCandidate.email}</p>
          <p>Company: {currentCandidate.company}</p>
          <a href={currentCandidate.html_url} target="_blank" rel="noopener noreferrer">View Profile</a>
          <div>
            <button onClick={() => handleSaveCandidate(currentCandidate)}>+</button>
            <button onClick={nextCandidate}>-</button>
          </div>
        </div>
      ) : (
        <p>No candidates available</p>
      )}
    </div>
  );
};

export default CandidateSearch;
