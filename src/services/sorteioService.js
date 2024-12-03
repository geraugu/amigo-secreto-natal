import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export const salvarSorteio = async (resultadoSorteio) => {
  try {
    const sorteiosRef = collection(db, 'sorteios');
    const docRef = await addDoc(sorteiosRef, {
      data: new Date(),
      resultados: resultadoSorteio
    });
    return docRef.id;
  } catch (error) {
    console.error('Erro ao salvar sorteio:', error);
    throw error;
  }
};

export const buscarResultadoPorHash = async (hash) => {
  try {
    const sorteiosRef = collection(db, 'sorteios');
    const querySnapshot = await getDocs(sorteiosRef);
    
    let resultado = null;
    querySnapshot.forEach((doc) => {
      const sorteio = doc.data();
      const participante = sorteio.resultados.find(p => p.hash === hash);
      if (participante) {
        resultado = participante;
      }
    });
    
    return resultado;
  } catch (error) {
    console.error('Erro ao buscar resultado:', error);
    throw error;
  }
};
