import React from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';

// Array of journal suggestions with more detailed examples
const journalSuggestions = [
  { id: '1', suggestion: 'Write about your day in detail. Include what you did, whom you met, and how you felt throughout the day.' },
  { id: '2', suggestion: 'What are you grateful for today? List at least three things and explain why they are important to you.' },
  { id: '3', suggestion: 'Describe a memorable event from your past. Include where it happened, who was involved, and why it was memorable.' },
  { id: '4', suggestion: 'What are your goals for the next month? Write down specific goals for personal growth, career, health, and relationships.' },
  { id: '5', suggestion: 'Write a letter to your future self. Include your current aspirations, fears, and advice you would give to your future self.' },
  { id: '6', suggestion: 'What are your current thoughts on your career? Reflect on your achievements, challenges, and where you see yourself in the future.' },
  { id: '7', suggestion: 'Reflect on a recent challenge you overcame. Describe how you handled the challenge, what you learned from it, and how it has impacted you.' },
  { id: '8', suggestion: 'List your favorite hobbies and why you enjoy them. Describe how each hobby makes you feel and why it brings you joy.' },
];

export default function Explore() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Journal Suggestions</Text>
      <FlatList
        data={journalSuggestions}
        renderItem={({ item }) => (
          <View style={styles.suggestionContainer}>
            <Text style={styles.suggestionText}>{item.suggestion}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 40, // Increased padding top for title
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 16, // Added margin top for title
  },
  suggestionContainer: {
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  suggestionText: {
    fontSize: 16,
    lineHeight: 22,
  },
});
