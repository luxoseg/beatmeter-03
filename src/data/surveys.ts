export interface Survey {
  id: number;
  artist: string;
  image: string;
  reward: number;
  premium?: boolean; // Novo campo para indicar artistas premium
  questions: {
    rating: string;
    recommendation: string;
    ageGroup: string;
  };
}

// Artistas normais (desbloqueados)
export const surveys: Survey[] = [
  {
    id: 1,
    artist: "Matuê",
    image: "/images/artists/matue.jpg",
    reward: 33.00,
    questions: {
      rating: "De 1 a 5, qual nota você daria para as músicas de Matuê?",
      recommendation: "Recomendaria o cantor Matuê para seus amigos e familiares?",
      ageGroup: "Qual faixa etária você acha que mais escuta o cantor Matuê?"
    }
  },
  {
    id: 2,
    artist: "Luan Santana",
    image: "/images/artists/luan-santana.jpg",
    reward: 34.00,
    questions: {
      rating: "De 1 a 5, qual nota você daria para as músicas do Luan Santana?",
      recommendation: "Recomendaria o cantor Luan Santana para seus amigos e familiares?",
      ageGroup: "Qual faixa etária você acha que mais escuta o cantor Luan Santana?"
    }
  },
  {
    id: 3,
    artist: "Anitta",
    image: "/images/artists/anitta.jpg",
    reward: 47.00,
    questions: {
      rating: "De 1 a 5, qual nota você daria para as músicas da Anitta?",
      recommendation: "Recomendaria a cantora Anitta para seus amigos e familiares?",
      ageGroup: "Qual faixa etária você acha que mais escuta a cantora Anitta?"
    }
  },
  {
    id: 4,
    artist: "Wesley Safadão",
    image: "/images/artists/wesley-safadao.jpg",
    reward: 43.00,
    questions: {
      rating: "De 1 a 5, qual nota você daria para as músicas do Wesley Safadão?",
      recommendation: "Recomendaria o cantor Wesley Safadão para seus amigos e familiares?",
      ageGroup: "Qual faixa etária você acha que mais escuta o cantor Wesley Safadão?"
    }
  },
  {
    id: 5,
    artist: "Ludmilla",
    image: "/images/artists/ludmilla.jpg",
    reward: 52.00,
    questions: {
      rating: "De 1 a 5, qual nota você daria para as músicas da Ludmilla?",
      recommendation: "Recomendaria a cantora Ludmilla para seus amigos e familiares?",
      ageGroup: "Qual faixa etária você acha que mais escuta a cantora Ludmilla?"
    }
  },
  {
    id: 6,
    artist: "MC Daniel",
    image: "/images/artists/mc-daniel.jpg",
    reward: 32.00,
    questions: {
      rating: "De 1 a 5, qual nota você daria para as músicas do MC Daniel?",
      recommendation: "Recomendaria o cantor MC Daniel para seus amigos e familiares?",
      ageGroup: "Qual faixa etária você acha que mais escuta o cantor MC Daniel?"
    }
  },
  {
    id: 7,
    artist: "MC Cabelinho",
    image: "/images/artists/mc-cabelinho.jpg",
    reward: 32.00,
    questions: {
      rating: "De 1 a 5, qual nota você daria para as músicas do MC Cabelinho?",
      recommendation: "Recomendaria o cantor MC Cabelinho para seus amigos e familiares?",
      ageGroup: "Qual faixa etária você acha que mais escuta o cantor MC Cabelinho?"
    }
  },
  {
    id: 8,
    artist: "Poze do Rodo",
    image: "/images/artists/poze.jpg",
    reward: 27.00,
    questions: {
      rating: "De 1 a 5, qual nota você daria para as músicas do Poze do Rodo?",
      recommendation: "Recomendaria o cantor Poze do Rodo para seus amigos e familiares?",
      ageGroup: "Qual faixa etária você acha que mais escuta o cantor Poze do Rodo?"
    }
  },
  {
    id: 9,
    artist: "Ivete Sangalo",
    image: "/images/artists/ivete.jpg",
    reward: 30.00,
    questions: {
      rating: "De 1 a 5, qual nota você daria para as músicas da Ivete Sangalo?",
      recommendation: "Recomendaria a cantora Ivete Sangalo para seus amigos e familiares?",
      ageGroup: "Qual faixa etária você acha que mais escuta a cantora Ivete Sangalo?"
    }
  },
  {
    id: 10,
    artist: "Alok",
    image: "/images/artists/alok.jpg",
    reward: 43.00,
    questions: {
      rating: "De 1 a 5, qual nota você daria para as músicas do Alok?",
      recommendation: "Recomendaria o DJ Alok para seus amigos e familiares?",
      ageGroup: "Qual faixa etária você acha que mais escuta o DJ Alok?"
    }
  }
];

// Artistas premium (bloqueados até validação)
export const premiumSurveys: Survey[] = [
  {
    id: 101,
    artist: "Billie Eilish",
    image: "/images/artists/premium/billie-eilish.jpg",
    reward: 120.00,
    premium: true,
    questions: {
      rating: "De 1 a 5, qual nota você daria para as músicas da Billie Eilish?",
      recommendation: "Recomendaria a cantora Billie Eilish para seus amigos e familiares?",
      ageGroup: "Qual faixa etária você acha que mais escuta a cantora Billie Eilish?"
    }
  },
  {
    id: 102,
    artist: "The Weeknd",
    image: "/images/artists/premium/the-weeknd.jpg",
    reward: 135.00,
    premium: true,
    questions: {
      rating: "De 1 a 5, qual nota você daria para as músicas do The Weeknd?",
      recommendation: "Recomendaria o cantor The Weeknd para seus amigos e familiares?",
      ageGroup: "Qual faixa etária você acha que mais escuta o cantor The Weeknd?"
    }
  },
  {
    id: 103,
    artist: "Taylor Swift",
    image: "/images/artists/premium/taylor-swift.jpg",
    reward: 145.00,
    premium: true,
    questions: {
      rating: "De 1 a 5, qual nota você daria para as músicas da Taylor Swift?",
      recommendation: "Recomendaria a cantora Taylor Swift para seus amigos e familiares?",
      ageGroup: "Qual faixa etária você acha que mais escuta a cantora Taylor Swift?"
    }
  },
  {
    id: 104,
    artist: "Drake",
    image: "/images/artists/premium/drake.jpg",
    reward: 130.00,
    premium: true,
    questions: {
      rating: "De 1 a 5, qual nota você daria para as músicas do Drake?",
      recommendation: "Recomendaria o cantor Drake para seus amigos e familiares?",
      ageGroup: "Qual faixa etária você acha que mais escuta o cantor Drake?"
    }
  },
  {
    id: 105,
    artist: "Zé Vaqueiro",
    image: "/images/artists/premium/ze-vaqueiro.jpg",
    reward: 125.00,
    premium: true,
    questions: {
      rating: "De 1 a 5, qual nota você daria para as músicas do Zé Vaqueiro?",
      recommendation: "Recomendaria o cantor Zé Vaqueiro para seus amigos e familiares?",
      ageGroup: "Qual faixa etária você acha que mais escuta o cantor Zé Vaqueiro?"
    }
  },
  {
    id: 106,
    artist: "Ariana Grande",
    image: "/images/artists/premium/ariana-grande.jpg",
    reward: 150.00,
    premium: true,
    questions: {
      rating: "De 1 a 5, qual nota você daria para as músicas da Ariana Grande?",
      recommendation: "Recomendaria a cantora Ariana Grande para seus amigos e familiares?",
      ageGroup: "Qual faixa etária você acha que mais escuta a cantora Ariana Grande?"
    }
  }
]