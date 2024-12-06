import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export const salvarSorteio = async (dadosSorteio) => {
  try {
    const sorteiosRef = collection(db, 'sorteios');
    const docRef = await addDoc(sorteiosRef, {
      data: new Date(),
      ...dadosSorteio
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
      if (sorteio.resultados && Array.isArray(sorteio.resultados)) {
        const participante = sorteio.resultados.find(p => p.hash === hash);
        if (participante) {
          resultado = {
            amigoSecreto: participante.amigoSecreto.nome,
            dadosSorteio: {
              titulo: sorteio.titulo,
              valorLimite: sorteio.valorLimite,
              regras: sorteio.regras
            }
          };
        }
      }
    });
    
    return resultado;
  } catch (error) {
    console.error('Erro ao buscar resultado:', error);
    throw error;
  }
};
