import React, { useEffect, useState } from 'react';
import { searchGithub } from '../api/API';
import { Candidate as CandidateType } from '../interfaces/Candidate.interface';

const CandidateSearch: React.FC = () => {
  const [candidates, setCandidates] = useState<CandidateType[]>([]);
  const [currentCandidateIndex, setCurrentCandidateIndex] = useState<number>(0);
  const [savedCandidates, setSavedCandidates] = useState<CandidateType[]>([]);
  const [viewedCandidates, setViewedCandidates] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Load saved candidates from local storage on component mount
  useEffect(() => {
    const storedCandidates = localStorage.getItem('potentialCandidates');
    if (storedCandidates) {
      setSavedCandidates(JSON.parse(storedCandidates));
    }
  }, []);

  useEffect(() => {
    setCandidates([]); // Clear previous candidates on mount
    fetchCandidates(); // Fetch new candidates
  }, []);

  // Fetch candidates from GitHub API
  const fetchCandidates = async () => {
    console.log('Fetching new candidates...');
    try {
      // Generate a new 'since' parameter to avoid duplication
      const since = Math.floor(Math.random() * 100000000) + 1;
      const data: CandidateType[] = await searchGithub(since);
      // Filter out already viewed and saved candidates
      const uniqueCandidates = data.filter(
        (candidate) =>
          !viewedCandidates.includes(candidate.id) &&
          !savedCandidates.some(saved => saved.id === candidate.id)
      );
      setCandidates(uniqueCandidates);
      setViewedCandidates((prev) => [
        ...prev,
        ...uniqueCandidates.map(candidate => candidate.id),
      ]);
      setCurrentCandidateIndex(0); // Reset to the first candidate in the new list
    } catch (err) {
      const error = err as Error;
      setError(error.message);
    }
  };

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
      if (nextIndex >= candidates.length) {
        fetchCandidates(); // Fetch new candidates when reaching the end
        return 0; // Reset index to start
      }
      return nextIndex;
    });
  };
  // Get the current candidate based on the index
  const currentCandidate = candidates[currentCandidateIndex];

  return (
    <div className="main-container">
      <h1>Candidate Search</h1>
      {error && <p>Error: {error}</p>}
      {currentCandidate ? (
        <div>
          <div className="candidate-card">
            <img src={currentCandidate.avatar_url} alt={currentCandidate.login} />
            <h2>{currentCandidate.login}</h2>
            <p>Location: {currentCandidate.location}</p>
            <p>Email: {currentCandidate.email}</p>
            <p>Company: {currentCandidate.company}</p>
            <a href={currentCandidate.html_url} target="_blank" rel="noopener noreferrer">View Profile</a>
          </div>
          <div className="button-container">
            <button className="remove-button" onClick={nextCandidate}>-</button>
            <button className="add-button" onClick={() => handleSaveCandidate(currentCandidate)}>+</button>
          </div>
        </div>
      ) : (
        <p>No candidates available</p>
      )}
    </div>
  );
};

export default CandidateSearch;