import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';
import {
  UserProfile,
  StreakData,
  GamificationState,
  Project,
  PersonalNote,
  Bookmark,
  Problem,
} from '../types/studentos';

// ----------------------------------------------------
// User Profile Operations
// ----------------------------------------------------

export async function fetchUserProfileDB(userId: string): Promise<UserProfile | null> {
  if (!isFirebaseConfigured || !db) return null;
  try {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as UserProfile;
    }
    return null;
  } catch (error) {
    console.error('Error fetching user profile from Firestore:', error);
    return null;
  }
}

export async function saveUserProfileDB(profile: UserProfile): Promise<void> {
  if (!isFirebaseConfigured || !db || !profile.id) return;
  try {
    const docRef = doc(db, 'users', profile.id);
    await setDoc(docRef, profile, { merge: true });
  } catch (error) {
    console.error('Error saving user profile to Firestore:', error);
  }
}

// ----------------------------------------------------
// Streak Data Operations
// ----------------------------------------------------

export async function fetchStreakDB(userId: string): Promise<StreakData | null> {
  if (!isFirebaseConfigured || !db) return null;
  try {
    const docRef = doc(db, 'streaks', userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as StreakData;
    }
    return null;
  } catch (error) {
    console.error('Error fetching streak data from Firestore:', error);
    return null;
  }
}

export async function saveStreakDB(userId: string, streak: StreakData): Promise<void> {
  if (!isFirebaseConfigured || !db) return;
  try {
    const docRef = doc(db, 'streaks', userId);
    await setDoc(docRef, { ...streak, userId }, { merge: true });
  } catch (error) {
    console.error('Error saving streak data to Firestore:', error);
  }
}

// ----------------------------------------------------
// Gamification Operations
// ----------------------------------------------------

export async function fetchGamificationDB(userId: string): Promise<GamificationState | null> {
  if (!isFirebaseConfigured || !db) return null;
  try {
    const docRef = doc(db, 'gamification', userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as GamificationState;
    }
    return null;
  } catch (error) {
    console.error('Error fetching gamification data from Firestore:', error);
    return null;
  }
}

export async function saveGamificationDB(userId: string, gamification: GamificationState): Promise<void> {
  if (!isFirebaseConfigured || !db) return;
  try {
    const docRef = doc(db, 'gamification', userId);
    await setDoc(docRef, { ...gamification, userId }, { merge: true });
  } catch (error) {
    console.error('Error saving gamification data to Firestore:', error);
  }
}

// ----------------------------------------------------
// Projects & Tasks Operations
// ----------------------------------------------------

export async function fetchProjectsDB(userId: string): Promise<Project[]> {
  if (!isFirebaseConfigured || !db) return [];
  try {
    const q = query(collection(db, 'projects'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const projects: Project[] = [];
    querySnapshot.forEach((docSnap) => {
      projects.push(docSnap.data() as Project);
    });
    return projects;
  } catch (error) {
    console.error('Error fetching projects from Firestore:', error);
    return [];
  }
}

export async function saveProjectDB(userId: string, project: Project): Promise<void> {
  if (!isFirebaseConfigured || !db) return;
  try {
    const docRef = doc(db, 'projects', project.id);
    await setDoc(docRef, { ...project, userId }, { merge: true });
  } catch (error) {
    console.error('Error saving project to Firestore:', error);
  }
}

// ----------------------------------------------------
// Personal Notes Operations
// ----------------------------------------------------

export async function fetchNotesDB(userId: string): Promise<PersonalNote[]> {
  if (!isFirebaseConfigured || !db) return [];
  try {
    const q = query(collection(db, 'notes'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const notes: PersonalNote[] = [];
    querySnapshot.forEach((docSnap) => {
      notes.push(docSnap.data() as PersonalNote);
    });
    return notes;
  } catch (error) {
    console.error('Error fetching notes from Firestore:', error);
    return [];
  }
}

export async function saveNoteDB(userId: string, note: PersonalNote): Promise<void> {
  if (!isFirebaseConfigured || !db) return;
  try {
    const docRef = doc(db, 'notes', note.id);
    await setDoc(docRef, { ...note, userId }, { merge: true });
  } catch (error) {
    console.error('Error saving note to Firestore:', error);
  }
}

export async function deleteNoteDB(userId: string, noteId: string): Promise<void> {
  if (!isFirebaseConfigured || !db) return;
  try {
    const docRef = doc(db, 'notes', noteId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting note from Firestore:', error);
  }
}

// ----------------------------------------------------
// Bookmarks Operations
// ----------------------------------------------------

export async function fetchBookmarksDB(userId: string): Promise<Bookmark[]> {
  if (!isFirebaseConfigured || !db) return [];
  try {
    const q = query(collection(db, 'bookmarks'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const bookmarks: Bookmark[] = [];
    querySnapshot.forEach((docSnap) => {
      bookmarks.push(docSnap.data() as Bookmark);
    });
    return bookmarks;
  } catch (error) {
    console.error('Error fetching bookmarks from Firestore:', error);
    return [];
  }
}

export async function saveBookmarkDB(userId: string, bookmark: Bookmark): Promise<void> {
  if (!isFirebaseConfigured || !db) return;
  try {
    const docRef = doc(db, 'bookmarks', bookmark.id);
    await setDoc(docRef, { ...bookmark, userId }, { merge: true });
  } catch (error) {
    console.error('Error saving bookmark to Firestore:', error);
  }
}

export async function deleteBookmarkDB(userId: string, bookmarkId: string): Promise<void> {
  if (!isFirebaseConfigured || !db) return;
  try {
    const docRef = doc(db, 'bookmarks', bookmarkId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting bookmark from Firestore:', error);
  }
}
