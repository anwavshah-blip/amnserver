import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Atom, BookOpen, Calculator, Share2, Bookmark } from 'lucide-react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

interface TopicContent {
  title: string;
  subtitle: string;
  content: string[];
  keyPoints: string[];
  formulas: { name: string; formula: string }[];
  applications: string[];
}

const topicContents: Record<string, TopicContent> = {
  'quantum-mechanics': {
    title: 'Quantum Mechanics',
    subtitle: 'The Foundation of Modern Physics',
    content: [
      'Quantum mechanics is a fundamental theory in physics that provides a description of the physical properties of nature at the scale of atoms and subatomic particles. It is the foundation of all quantum physics including quantum chemistry, quantum field theory, quantum technology, and quantum information science.',
      
      'The mathematical formulations of quantum mechanics are abstract. A mathematical function, the wave function, provides information about the probability amplitude of position, momentum, and other physical properties of a particle. Mathematical manipulations of the wave function involve the mathematics of Hilbert spaces, linear operators, and generalized probability theory.',
      
      'One of the most revolutionary aspects of quantum mechanics is the concept of wave-particle duality. This principle states that all matter exhibits both wave-like and particle-like properties. A classic example is the double-slit experiment, where particles such as electrons create an interference pattern characteristic of waves when not observed, but act like individual particles when measured.',
      
      'The uncertainty principle, formulated by Werner Heisenberg in 1927, states that the more precisely the position of a particle is determined, the less precisely its momentum can be known, and vice versa. This is not due to limitations in measurement technology but is a fundamental property of quantum systems.',
      
      'Quantum entanglement is another fascinating phenomenon where pairs or groups of particles interact in such a way that the quantum state of each particle cannot be described independently of the others, even when separated by large distances. This "spooky action at a distance," as Einstein called it, has been experimentally verified and forms the basis for quantum computing and quantum cryptography.',
      
      'The Schrödinger equation is the fundamental equation of quantum mechanics, analogous to Newton\'s second law in classical mechanics. It describes how the quantum state of a physical system changes over time. Solutions to this equation provide the wave functions that contain all the information about a quantum system.',
      
      'Quantum mechanics has led to many technological innovations, including lasers, transistors, electron microscopes, and MRI machines. The emerging field of quantum computing promises to revolutionize computation by exploiting quantum superposition and entanglement to perform calculations exponentially faster than classical computers for certain problems.',
    ],
    keyPoints: [
      'Wave-particle duality: Matter exhibits both wave and particle properties',
      'Heisenberg Uncertainty Principle: Cannot simultaneously know position and momentum precisely',
      'Quantum Superposition: Particles can exist in multiple states simultaneously',
      'Quantum Entanglement: Particles remain connected regardless of distance',
      'Wave Function: Contains all information about a quantum system',
      'Schrödinger Equation: Governs the time evolution of quantum systems',
    ],
    formulas: [
      { name: 'Schrödinger Equation', formula: 'iℏ(∂ψ/∂t) = Ĥψ' },
      { name: 'Heisenberg Uncertainty', formula: 'Δx · Δp ≥ ℏ/2' },
      { name: 'Wave Function Probability', formula: 'P = |ψ|²' },
      { name: 'Energy Eigenvalue', formula: 'Ĥψ = Eψ' },
    ],
    applications: [
      'Quantum Computing',
      'Lasers and Optics',
      'Semiconductor Electronics',
      'Medical Imaging (MRI)',
      'Quantum Cryptography',
      'Electron Microscopy',
    ],
  },
  'relativity': {
    title: 'Theory of Relativity',
    subtitle: 'Einstein\'s Revolutionary Framework',
    content: [
      'The theory of relativity, developed by Albert Einstein in the early 20th century, revolutionized our understanding of space, time, and gravity. It consists of two major components: Special Relativity (1905) and General Relativity (1915).',
      
      'Special Relativity is based on two fundamental postulates: (1) The laws of physics are identical in all inertial reference frames, and (2) The speed of light in a vacuum is constant for all observers, regardless of their relative motion. These seemingly simple principles lead to profound consequences.',
      
      'One of the most famous results of Special Relativity is the equivalence of mass and energy, expressed by the equation E = mc². This principle explains the enormous energy released in nuclear reactions and powers the sun through nuclear fusion.',
      
      'Time dilation and length contraction are other counterintuitive consequences of Special Relativity. Moving clocks run slower relative to stationary observers, and moving objects appear shorter in the direction of motion. These effects become significant only at speeds approaching the speed of light.',
      
      'General Relativity extends these principles to include gravity. Einstein proposed that massive objects curve the fabric of spacetime, and this curvature is what we perceive as gravity. Planets orbit the sun not because of a mysterious force acting at a distance, but because they are following the curvature of spacetime created by the sun\'s mass.',
      
      'General Relativity has been confirmed by numerous experiments and observations, including the bending of starlight by massive objects (gravitational lensing), the precession of Mercury\'s orbit, and the existence of gravitational waves—ripples in spacetime caused by accelerating massive objects, which were directly detected in 2015.',
      
      'Black holes are perhaps the most exotic prediction of General Relativity. These are regions of spacetime where gravity is so strong that nothing, not even light, can escape. The recent imaging of black holes by the Event Horizon Telescope provides stunning confirmation of Einstein\'s theory.',
    ],
    keyPoints: [
      'Speed of light is constant for all observers',
      'Mass and energy are equivalent (E = mc²)',
      'Time dilation: Moving clocks run slower',
      'Length contraction: Moving objects appear shorter',
      'Gravity is the curvature of spacetime',
      'Black holes are regions of infinite spacetime curvature',
    ],
    formulas: [
      { name: 'Mass-Energy Equivalence', formula: 'E = mc²' },
      { name: 'Time Dilation', formula: 't\' = t/√(1-v²/c²)' },
      { name: 'Length Contraction', formula: 'L\' = L√(1-v²/c²)' },
      { name: 'Relativistic Momentum', formula: 'p = γmv' },
    ],
    applications: [
      'GPS Satellite Corrections',
      'Particle Accelerators',
      'Nuclear Energy',
      'Astrophysics',
      'Gravitational Wave Detection',
      'Cosmology',
    ],
  },
  'thermodynamics': {
    title: 'Thermodynamics',
    subtitle: 'The Science of Energy and Heat',
    content: [
      'Thermodynamics is the branch of physics that deals with heat, work, temperature, and their relation to energy, radiation, and physical properties of matter. The behavior of these quantities is governed by the four laws of thermodynamics.',
      
      'The Zeroth Law of Thermodynamics establishes the concept of temperature. It states that if two systems are each in thermal equilibrium with a third system, then they are in thermal equilibrium with each other. This law allows us to define temperature scales and thermometers.',
      
      'The First Law of Thermodynamics is essentially the law of conservation of energy applied to thermodynamic systems. It states that the change in internal energy of a system equals the heat added to the system minus the work done by the system. This law prohibits the creation of perpetual motion machines of the first kind.',
      
      'The Second Law of Thermodynamics introduces the concept of entropy and the arrow of time. It states that the total entropy of an isolated system can never decrease over time. This law explains why certain processes are irreversible and why heat flows from hot to cold objects.',
      
      'The Third Law of Thermodynamics states that the entropy of a perfect crystal at absolute zero is exactly equal to zero. This law implies that it is impossible to reach absolute zero temperature in a finite number of steps.',
      
      'Thermodynamics has wide-ranging applications in engineering, chemistry, biology, and economics. It governs the design of heat engines, refrigerators, and power plants. It also plays a crucial role in understanding chemical reactions, biological processes, and even information theory.',
      
      'The concept of entropy has profound implications beyond physics. In information theory, entropy measures the amount of uncertainty or information in a message. In ecology, it relates to the flow of energy through ecosystems. The second law of thermodynamics essentially tells us that the universe tends toward disorder.',
    ],
    keyPoints: [
      'Zeroth Law: Defines temperature and thermal equilibrium',
      'First Law: Conservation of energy in thermodynamic systems',
      'Second Law: Entropy of isolated systems never decreases',
      'Third Law: Absolute zero entropy is zero',
      'Heat flows spontaneously from hot to cold objects',
      'Perpetual motion machines are impossible',
    ],
    formulas: [
      { name: 'First Law', formula: 'ΔU = Q - W' },
      { name: 'Entropy Change', formula: 'ΔS = Q/T' },
      { name: 'Ideal Gas Law', formula: 'PV = nRT' },
      { name: 'Efficiency', formula: 'η = 1 - Tc/Th' },
    ],
    applications: [
      'Heat Engines',
      'Refrigeration',
      'Power Plants',
      'Chemical Engineering',
      'Climate Science',
      'Biological Systems',
    ],
  },
  'electromagnetism': {
    title: 'Electromagnetism',
    subtitle: 'The Unified Theory of Electricity and Magnetism',
    content: [
      'Electromagnetism is one of the four fundamental forces of nature, describing the interactions between electrically charged particles. It encompasses both electricity and magnetism, which were unified into a single theory by James Clerk Maxwell in the 19th century.',
      
      'Electric fields are created by electric charges and exert forces on other charges. The strength of the electric field decreases with the square of the distance from the charge. Like charges repel each other, while opposite charges attract.',
      
      'Magnetic fields are produced by moving electric charges (electric currents) and magnetic dipoles. The Earth itself has a magnetic field, which is why compasses work. Magnetic field lines form closed loops, and the field is strongest near the magnetic poles.',
      
      'Maxwell\'s equations are the foundation of classical electromagnetism. These four equations describe how electric and magnetic fields are generated and altered by each other and by charges and currents. They predict the existence of electromagnetic waves, which include light, radio waves, X-rays, and gamma rays.',
      
      'Electromagnetic induction, discovered by Michael Faraday, is the production of an electromotive force across an electrical conductor in a changing magnetic field. This principle is the basis for electric generators, transformers, and inductors.',
      
      'Electromagnetic waves are oscillating electric and magnetic fields that propagate through space at the speed of light. The electromagnetic spectrum ranges from low-energy radio waves to high-energy gamma rays, with visible light occupying only a small portion of this spectrum.',
      
      'Quantum electrodynamics (QED) is the quantum theory of electromagnetism. It describes how light and matter interact and is one of the most precisely tested theories in physics. QED explains phenomena such as the photoelectric effect and the Lamb shift.',
    ],
    keyPoints: [
      'Electric charges create electric fields',
      'Moving charges create magnetic fields',
      'Maxwell\'s equations unify electricity and magnetism',
      'Electromagnetic waves travel at the speed of light',
      'Electromagnetic induction generates current from changing magnetic fields',
      'The electromagnetic spectrum includes all types of EM radiation',
    ],
    formulas: [
      { name: 'Coulomb\'s Law', formula: 'F = k(q₁q₂)/r²' },
      { name: 'Ohm\'s Law', formula: 'V = IR' },
      { name: 'Faraday\'s Law', formula: 'ε = -dΦ/dt' },
      { name: 'Wave Speed', formula: 'c = fλ' },
    ],
    applications: [
      'Electric Power Generation',
      'Telecommunications',
      'Medical Imaging',
      'Electronics',
      'Magnetic Levitation',
      'Wireless Charging',
    ],
  },
  'particle-physics': {
    title: 'Particle Physics',
    subtitle: 'The Study of Fundamental Particles',
    content: [
      'Particle physics, also known as high-energy physics, is the study of the fundamental constituents of matter and radiation, and the interactions between them. It seeks to answer the most fundamental questions about the nature of the universe.',
      
      'The Standard Model of particle physics is the theory that describes three of the four known fundamental forces (electromagnetic, weak, and strong interactions) and classifies all known elementary particles. It is one of the most successful scientific theories ever developed.',
      
      'Matter is composed of fermions, which include quarks and leptons. Quarks combine to form hadrons such as protons and neutrons. There are six types (flavors) of quarks: up, down, charm, strange, top, and bottom. Leptons include electrons, muons, tau particles, and their associated neutrinos.',
      
      'Force carriers are bosons that mediate the fundamental forces. Photons carry the electromagnetic force, W and Z bosons carry the weak force, and gluons carry the strong force. The Higgs boson, discovered in 2012 at CERN, is responsible for giving other particles mass through the Higgs mechanism.',
      
      'Particle accelerators, such as the Large Hadron Collider (LHC) at CERN, are essential tools for particle physics research. By accelerating particles to near the speed of light and colliding them, physicists can recreate conditions that existed moments after the Big Bang and discover new particles.',
      
      'The strong nuclear force, carried by gluons, binds quarks together inside protons and neutrons. It is called strong because it is much stronger than the electromagnetic force at short distances. The weak nuclear force is responsible for radioactive decay and nuclear fusion.',
      
      'Despite its success, the Standard Model is incomplete. It does not include gravity, does not explain dark matter or dark energy, and does not account for the matter-antimatter asymmetry in the universe. Physicists continue to search for new physics beyond the Standard Model.',
    ],
    keyPoints: [
      'Standard Model describes fundamental particles and forces',
      'Quarks combine to form protons and neutrons',
      'Force carriers are bosons (photons, gluons, W/Z bosons)',
      'Higgs boson gives particles mass',
      'Particle accelerators recreate Big Bang conditions',
      'The Standard Model is incomplete (no gravity, dark matter)',
    ],
    formulas: [
      { name: 'Mass-Energy', formula: 'E² = (pc)² + (mc²)²' },
      { name: 'Decay Rate', formula: 'N = N₀e^(-λt)' },
      { name: 'Cross Section', formula: 'σ = N/(n·t)' },
      { name: 'Momentum', formula: 'p = γmv' },
    ],
    applications: [
      'Medical Imaging (PET scans)',
      'Cancer Treatment',
      'Materials Science',
      'Archaeological Dating',
      'Nuclear Energy',
      'Fundamental Research',
    ],
  },
  'wave-mechanics': {
    title: 'Wave Mechanics',
    subtitle: 'Understanding Wave Phenomena',
    content: [
      'Wave mechanics is the study of wave phenomena and their mathematical description. Waves are disturbances that propagate through space and time, transferring energy without permanently displacing the medium through which they travel.',
      
      'Mechanical waves require a medium to travel through. Sound waves, water waves, and seismic waves are all examples of mechanical waves. The particles of the medium oscillate around their equilibrium positions as the wave passes, but they do not travel with the wave.',
      
      'Electromagnetic waves, including light, radio waves, and X-rays, do not require a medium. They consist of oscillating electric and magnetic fields that propagate through space at the speed of light. All electromagnetic waves travel at the same speed in a vacuum, regardless of their frequency.',
      
      'Wave interference occurs when two or more waves meet. Constructive interference happens when waves are in phase, resulting in a larger amplitude. Destructive interference occurs when waves are out of phase, potentially canceling each other out. Interference is a characteristic property of waves.',
      
      'Diffraction is the bending of waves around obstacles or through apertures. The amount of diffraction depends on the wavelength of the wave relative to the size of the obstacle or aperture. This phenomenon explains why we can hear sounds around corners and why light creates patterns when passing through narrow slits.',
      
      'Standing waves are formed when two waves of the same frequency and amplitude travel in opposite directions and interfere with each other. They appear to stand still, with points of maximum amplitude (antinodes) and zero amplitude (nodes). Standing waves are important in musical instruments and quantum mechanics.',
      
      'The wave-particle duality, a fundamental concept in quantum mechanics, states that all matter exhibits both wave-like and particle-like properties. Electrons, which were traditionally thought of as particles, can produce interference patterns characteristic of waves. This duality is described mathematically by the de Broglie wavelength.',
    ],
    keyPoints: [
      'Waves transfer energy without transferring matter',
      'Mechanical waves need a medium; electromagnetic waves do not',
      'Interference can be constructive or destructive',
      'Diffraction is the bending of waves around obstacles',
      'Standing waves have nodes and antinodes',
      'Matter exhibits wave-particle duality',
    ],
    formulas: [
      { name: 'Wave Speed', formula: 'v = fλ' },
      { name: 'De Broglie Wavelength', formula: 'λ = h/p' },
      { name: 'Frequency-Period', formula: 'f = 1/T' },
      { name: 'Wave Energy', formula: 'E = hf' },
    ],
    applications: [
      'Musical Instruments',
      'Sonar and Radar',
      'Medical Ultrasound',
      'Telecommunications',
      'Seismology',
      'Quantum Mechanics',
    ],
  },
  'nuclear-physics': {
    title: 'Nuclear Physics',
    subtitle: 'The Study of Atomic Nuclei',
    content: [
      'Nuclear physics is the field of physics that studies atomic nuclei and their constituents and interactions. It seeks to understand the fundamental forces that bind protons and neutrons together and the processes by which nuclei transform.',
      
      'The atomic nucleus consists of protons and neutrons, collectively called nucleons. The number of protons determines the element, while the total number of nucleons determines the isotope. The strong nuclear force overcomes the electromagnetic repulsion between protons to hold the nucleus together.',
      
      'Radioactivity is the spontaneous decay of unstable atomic nuclei. There are three main types of radioactive decay: alpha decay (emission of helium nuclei), beta decay (emission of electrons or positrons), and gamma decay (emission of high-energy photons). Each type has different penetrating power and biological effects.',
      
      'Nuclear fission is the splitting of a heavy nucleus into two or more lighter nuclei, releasing a large amount of energy. This process powers nuclear reactors and atomic bombs. Nuclear fusion, the combining of light nuclei to form heavier ones, powers the sun and stars and is the goal of ongoing research for clean energy.',
      
      'Half-life is the time required for half of the radioactive atoms in a sample to decay. This concept is used in radioactive dating to determine the age of archaeological artifacts and geological formations. Carbon-14 dating, for example, can determine the age of organic materials up to about 50,000 years old.',
      
      'Nuclear medicine uses radioactive isotopes for diagnosis and treatment. PET scans use positron-emitting isotopes to create images of metabolic processes in the body. Radiation therapy uses targeted radiation to destroy cancer cells while minimizing damage to healthy tissue.',
      
      'Particle accelerators are essential tools for nuclear physics research. They can create new isotopes, study the properties of nuclear matter under extreme conditions, and probe the fundamental structure of nucleons. Facilities like CERN and RHIC push the boundaries of our understanding of nuclear matter.',
    ],
    keyPoints: [
      'Nucleus contains protons and neutrons held by strong force',
      'Radioactivity is spontaneous nuclear decay',
      'Fission splits heavy nuclei; fusion combines light nuclei',
      'Half-life is the time for half of nuclei to decay',
      'Nuclear medicine uses isotopes for diagnosis and treatment',
      'Particle accelerators create and study exotic nuclei',
    ],
    formulas: [
      { name: 'Decay Law', formula: 'N = N₀e^(-λt)' },
      { name: 'Half-Life', formula: 't₁/₂ = ln(2)/λ' },
      { name: 'Mass-Energy', formula: 'E = Δmc²' },
      { name: 'Binding Energy', formula: 'B = [Zmₚ + Nmₙ - M]c²' },
    ],
    applications: [
      'Nuclear Power',
      'Medical Imaging',
      'Cancer Treatment',
      'Archaeological Dating',
      'Food Preservation',
      'Scientific Research',
    ],
  },
  'computational-physics': {
    title: 'Computational Physics',
    subtitle: 'Solving Physics Problems with Computers',
    content: [
      'Computational physics is the study and implementation of numerical analysis to solve problems in physics. It bridges theoretical physics and experimental physics, using computational methods to study systems that are too complex for analytical solutions or too expensive or dangerous to study experimentally.',
      
      'Numerical methods are at the heart of computational physics. These include techniques for solving differential equations, performing integrations, finding roots of equations, and optimizing functions. Common methods include the finite difference method, finite element method, and Monte Carlo simulations.',
      
      'Molecular dynamics simulations track the motion of individual atoms and molecules over time, using Newton\'s equations of motion. These simulations can model the behavior of materials at the atomic scale, study protein folding, and understand chemical reactions.',
      
      'Monte Carlo methods use random sampling to solve problems. They are particularly useful for simulating systems with many degrees of freedom, such as statistical mechanical systems, and for calculating high-dimensional integrals. The Metropolis algorithm is a widely used Monte Carlo method.',
      
      'Quantum mechanical simulations solve the Schrödinger equation for electrons in atoms and molecules. Density functional theory (DFT) is a popular method that reduces the complexity of the many-electron problem. These calculations are essential for understanding chemical bonding and material properties.',
      
      'High-performance computing (HPC) is essential for many computational physics problems. Supercomputers with thousands of processors can perform simulations that would be impossible on desktop computers. Parallel programming techniques, such as MPI and OpenMP, are used to distribute calculations across multiple processors.',
      
      'Visualization is a crucial aspect of computational physics. Complex simulation results are often best understood through visual representations. Scientific visualization tools can create 2D plots, 3D renderings, and animations that reveal patterns and insights hidden in raw data.',
    ],
    keyPoints: [
      'Numerical methods solve complex physics problems',
      'Molecular dynamics simulates atomic motion',
      'Monte Carlo methods use random sampling',
      'Quantum simulations solve electronic structure problems',
      'High-performance computing enables large-scale simulations',
      'Visualization reveals patterns in simulation data',
    ],
    formulas: [
      { name: 'Euler Method', formula: 'yₙ₊₁ = yₙ + hf(xₙ,yₙ)' },
      { name: 'Verlet Algorithm', formula: 'r(t+Δt) = 2r(t) - r(t-Δt) + a(t)Δt²' },
      { name: 'DFT Energy', formula: 'E[ρ] = T[ρ] + V[ρ] + Eₓc[ρ]' },
      { name: 'Monte Carlo', formula: '⟨A⟩ ≈ (1/N)ΣᵢA(xᵢ)' },
    ],
    applications: [
      'Climate Modeling',
      'Materials Design',
      'Drug Discovery',
      'Astrophysical Simulations',
      'Engineering Analysis',
      'Financial Modeling',
    ],
  },
  'astrophysics': {
    title: 'Astrophysics',
    subtitle: 'The Physics of the Universe',
    content: [
      'Astrophysics is the branch of astronomy that employs the principles of physics and chemistry to explain the nature of celestial objects and the physical processes that govern their behavior. It seeks to understand the origin and evolution of the universe and everything in it.',
      
      'Stars are massive, luminous spheres of plasma held together by gravity. They generate energy through nuclear fusion in their cores, converting hydrogen into helium. The balance between gravitational contraction and radiation pressure determines a star\'s structure and evolution.',
      
      'Stellar evolution describes how stars change over time. A star\'s life cycle depends primarily on its mass. Low-mass stars like our Sun end their lives as white dwarfs, while massive stars explode as supernovae, leaving behind neutron stars or black holes.',
      
      'Black holes are regions of spacetime where gravity is so strong that nothing, not even light, can escape. They form when massive stars collapse at the end of their lives. The event horizon marks the boundary beyond which escape is impossible. Supermassive black holes, millions to billions of times the mass of the Sun, reside at the centers of most galaxies.',
      
      'Galaxies are vast collections of stars, gas, dust, and dark matter bound together by gravity. Our Milky Way is a barred spiral galaxy containing hundreds of billions of stars. Galaxies come in various shapes and sizes, including ellipticals, spirals, and irregulars.',
      
      'Cosmology is the study of the universe as a whole. The Big Bang theory describes the origin of the universe approximately 13.8 billion years ago. Evidence for the Big Bang includes the expansion of the universe, the cosmic microwave background radiation, and the abundance of light elements.',
      
      'Dark matter and dark energy are two mysterious components that dominate the universe. Dark matter, which does not emit light but exerts gravitational force, makes up about 27% of the universe. Dark energy, which drives the accelerating expansion of the universe, accounts for about 68%. Ordinary matter makes up only about 5%.',
    ],
    keyPoints: [
      'Stars generate energy through nuclear fusion',
      'Stellar evolution depends on mass',
      'Black holes have escape velocities exceeding light speed',
      'Galaxies contain billions of stars',
      'The universe began with the Big Bang',
      'Dark matter and dark energy dominate the universe',
    ],
    formulas: [
      { name: 'Stellar Luminosity', formula: 'L = 4πR²σT⁴' },
      { name: 'Schwarzschild Radius', formula: 'rₛ = 2GM/c²' },
      { name: 'Hubble\'s Law', formula: 'v = H₀d' },
      { name: 'Redshift', formula: 'z = (λₒ - λₑ)/λₑ' },
    ],
    applications: [
      'Space Exploration',
      'Satellite Technology',
      'Navigation Systems',
      'Climate Studies',
      'Fundamental Physics',
      'Public Education',
    ],
  },
};

export default function PhysicsContent() {
  const { topicId } = useParams<{ topicId: string }>();
  const topic = topicId ? topicContents[topicId] : null;

  if (!topic) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-32 pb-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Topic Not Found</h1>
          <p className="text-muted-foreground mb-6">The physics topic you're looking for doesn't exist.</p>
          <Link to="/physics" className="glass-button px-6 py-3">
            Back to Physics
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="relative pt-32 pb-20">
        <div className="section-container">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <Link
              to="/physics"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Physics
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl glass-button flex items-center justify-center">
                <Atom className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold">{topic.title}</h1>
                <p className="text-muted-foreground">{topic.subtitle}</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 glass-card text-sm hover:bg-white/5 transition-colors">
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <button className="flex items-center gap-2 px-4 py-2 glass-card text-sm hover:bg-white/5 transition-colors">
                <Bookmark className="w-4 h-4" />
                Save
              </button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="glass-card p-8">
                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Overview
                </h2>
                
                <div className="space-y-6">
                  {topic.content.map((paragraph, index) => (
                    <p key={index} className="text-muted-foreground leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Key Points */}
              <div className="glass-card p-8 mt-6">
                <h2 className="text-2xl font-semibold mb-6">Key Points</h2>
                <ul className="space-y-3">
                  {topic.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Formulas */}
              <div className="glass-card p-8 mt-6">
                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-primary" />
                  Key Formulas
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {topic.formulas.map((formula, index) => (
                    <div key={index} className="glass-card p-4">
                      <p className="text-sm text-muted-foreground mb-2">{formula.name}</p>
                      <p className="text-lg font-mono text-primary">{formula.formula}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-1"
            >
              {/* Applications */}
              <div className="glass-card p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Applications</h3>
                <div className="flex flex-wrap gap-2">
                  {topic.applications.map((app, index) => (
                    <span key={index} className="tag-glass">
                      {app}
                    </span>
                  ))}
                </div>
              </div>

              {/* Related Topics */}
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold mb-4">Related Topics</h3>
                <div className="space-y-3">
                  {Object.entries(topicContents)
                    .filter(([id]) => id !== topicId)
                    .slice(0, 4)
                    .map(([id, relatedTopic]) => (
                      <Link
                        key={id}
                        to={`/physics/${id}`}
                        className="block p-3 glass-card hover:bg-white/5 transition-colors"
                      >
                        <p className="font-medium text-sm">{relatedTopic.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {relatedTopic.subtitle}
                        </p>
                      </Link>
                    ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
