import React, { useEffect, useState } from 'react';
import { Candidate as CandidateType } from '../interfaces/Candidate.interface'; // Adjusted import path

const CandidateSearch: React.FC = () => {
  const [candidates, setCandidates] = useState<CandidateType[]>([]);
  const [currentCandidateIndex, setCurrentCandidateIndex] = useState<number>(0);
  const [savedCandidates, setSavedCandidates] = useState<CandidateType[]>([]);

  // Load saved candidates from local storage on component mount
  useEffect(() => {
    const storedCandidates = localStorage.getItem('potentialCandidates');
    if (storedCandidates) {
      setSavedCandidates(JSON.parse(storedCandidates));
    }
  }, []);

  // Function to save candidate
  const handleSaveCandidate = (candidate: CandidateType) => {
    // Check if the candidate is already saved
    const isAlreadySaved = savedCandidates.some(saved => saved.id === candidate.id);
    
    if (!isAlreadySaved) {
      const updatedCandidates = [...savedCandidates, candidate];
      setSavedCandidates(updatedCandidates);
      localStorage.setItem('potentialCandidates', JSON.stringify(updatedCandidates));
    }
    nextCandidate(); // Move to the next candidate after saving
  };

  // Mock data for candidates (replace with actual data fetching logic)
  useEffect(() => {
    const fetchCandidates = async () => {
      // Fetch candidates from your API
      const mockCandidates: CandidateType[] = [
        { id: 1, avatar_url: 'avatar1.png', login: 'User1', location: 'Location1', email: 'user1@example.com', company: 'Company1', html_url: 'https://github.com/user1' },
        { id: 2, avatar_url: 'avatar2.png', login: 'User2', location: 'Location2', email: 'user2@example.com', company: 'Company2', html_url: 'https://github.com/user2' },
        { id: 3, avatar_url: 'avatar3.png', login: 'User3', location: 'Location3', email: 'user3@example.com', company: 'Company3', html_url: 'https://github.com/user3' },
        // Add more candidates as needed
      ];
      setCandidates(mockCandidates);
    };

    fetchCandidates();
  }, []);

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
