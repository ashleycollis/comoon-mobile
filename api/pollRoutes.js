import firebase from 'firebase';
import 'firebase/firestore';

export async function getResponse(user) {
  try {
    let pollData = await firebase
      .firestore()
      .collection('events')
      .doc(user)
      .get();
    return pollData.data();
  } catch (error) {
    console.error(error);
  }
}
