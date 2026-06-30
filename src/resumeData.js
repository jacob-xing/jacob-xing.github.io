const resumeData = {
  name: "Jacob Xing",
  email: "jacob.xing@gmail.com",
  role: "Analog/Mixed-Signal IC Design Engineer",
  university: "Texas A&M University",
  graduation: "May 2031",
  about:
    "PhD student in Electrical Engineering at Texas A&M University specializing in analog/mixed-signal IC design and high-speed interconnects. Experienced in full-chip design flows from schematic to tape-out, with industry internships at IBM and Trusted Semiconductor Solutions.",

  socialLinks: [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/jacobxing/" },
    { name: "GitHub", url: "http://github.com/jacob-xing" },
  ],

  education: [
    {
      school: "Texas A&M University",
      degree: "PhD in Electrical Engineering",
      period: "Aug. 2026 – May 2031",
      location: "College Station, TX",
      details: "Advisor: Dr. Sam Palermo | GPA: 4.0/4.0 | Graduate Fellow",
    },
    {
      school: "University of Minnesota – Twin Cities",
      degree: "B.S. Electrical Engineering",
      period: "Jan. 2025 – May 2026",
      location: "Minneapolis, MN",
      details: "GPA: 3.89/4.0 | Summa Cum Laude, Dean's List, Distinction",
    },
  ],

  experience: [
    {
      company: "IBM",
      role: "Analog/Mixed-Signal IC Design Engineer Intern",
      period: "May 2026 – Aug. 2026",
      location: "Rochester, MN",
      bullets: [
        "Built MATLAB and Python code to characterize a 38.4 Gb/s PAM2 transmitter (Samsung SF2), enabling accurate S-parameter–based channel modeling for high-speed serial CDR simulations with microstrip lines, FFE/DFE, and eye diagram validation.",
        "Developed Verilog-A models of critical PLL building blocks (charge pump, loop filter, VCO) to accelerate top-level PLL simulation and design trade-off analysis.",
      ],
    },
    {
      company: "Trusted Semiconductor Solutions",
      role: "Analog/Mixed-Signal IC Design Engineer Intern",
      period: "May 2025 – Aug. 2025",
      location: "Brooklyn Park, MN",
      bullets: [
        "Designed and successfully taped out a bandgap voltage reference core and startup circuit in Intel 18A using Synopsys tools, achieving a 37 ppm/°C TC across −55 to 125 °C ensuring robust temperature and process variation performances with 5-bit trimming capabilities.",
        "Led bring-up and configuration of Synopsys EDA environments, including licensing and environment variables.",
        "Designed a low-voltage differential signaling (LVDS) output buffer at 400 Mbps with 6.3 mW power consumption in GlobalFoundries 180 nm and 45 nm SOI technologies using Cadence Virtuoso (SerDes).",
      ],
    },
    {
      company: "MTS Systems Corporation",
      role: "Electrical R&D Engineer Intern",
      period: "May 2024 – Aug. 2024",
      location: "Eden Prairie, MN",
      bullets: [
        "Diagnosed and resolved SPI protocol issues in the MTS FlexDAC Gen 2, improving data integrity through thorough RTL verification in ModelSim.",
        "Redesigned PCB layout using Altium, achieving a 10% reduction in both power consumption and BOM cost.",
        "Implemented a new ADC and bridge completion circuit for MTS FlexDAC, reducing per-channel cost by $9–14.",
      ],
    },
  ],

  teaching: [
    {
      institution: "University of Minnesota",
      role: "Undergraduate Teaching Assistant – EE 3115: Analog Electronics",
      period: "Aug. 2025 – Present",
      location: "Minneapolis, MN",
      bullets: [
        "Upper division course covering basics of current sources, single and multistage IC differential amplifiers, ideal (dc) feedback, stability and compensation of negative feedback amplifiers.",
        "Provided academic support and mentorship to 150+ undergraduates, fostering student engagement through clear communication of class topics.",
        "Facilitated two weekly discussion sections for 30+ students, clarifying complex concepts and encouraging active participation.",
      ],
    },
    {
      institution: "University of Minnesota",
      role: "Undergraduate Teaching Assistant – EE 3015: Signals and Systems",
      period: "Aug. 2025 – Present",
      location: "Minneapolis, MN",
      bullets: [
        "Upper division course covering control systems, signal processing, time/frequency models, Z transform, state models, stability, and feedback.",
        "Mentored a diverse cohort of 150+ undergraduate students during office hours, providing tailored academic support and study strategies.",
      ],
    },
    {
      institution: "University of Minnesota",
      role: "Undergraduate Teaching Assistant – EE 2115: Analog and Digital Electronics",
      period: "Jan. 2024 – May 2025",
      location: "Minneapolis, MN",
      bullets: [
        "Evaluated and provided constructive feedback on over 500 assignments with fast turnaround time.",
        "Demonstrated leadership by coordinating review sessions, facilitating group discussions, and promoting collaborative learning environments.",
      ],
    },
  ],

  research: [
    {
      group: "Dr. Palermo's Research Group, Texas A&M University",
      role: "Analog/Mixed-Signal Research Assistant",
      period: "Aug. 2026 – Present",
      location: "College Station, TX",
      bullets: [
        "Currently conducting research on high-speed electrical and optical interconnects.",
      ],
    },
    {
      group: "Dr. Harjani's Research Group, University of Minnesota",
      role: "Analog IC Undergraduate Research Assistant",
      period: "Aug. 2025 – May 2026",
      location: "Minneapolis, MN",
      bullets: [
        "Architected an analog readout scheme for a 60 FPS, 24 megapixel CMOS image sensor by designing a CDS circuit and single-slope ADC in LTSPICE and Cadence Virtuoso.",
        "Emulation of CMOS image sensor process photodiodes with TSMC 16 nm PDK to ensure accurate simulations.",
      ],
    },
    {
      group: "Dr. Chris Kim's VLSI Research Group, University of Minnesota",
      role: "VLSI Undergraduate Research Assistant",
      period: "Jan. 2024 – Aug. 2025",
      location: "Minneapolis, MN",
      bullets: [
        "Developed Python scripts for post-silicon validation of CMOS Oscillator-Based Ising (COBI) chips, with documentation to support future use by various users.",
        "Characterized quantum-inspired CMOS Oscillator-Based Ising (COBI) chips for Quadratic Unconstrained Binary Optimization (QUBO) and Ising problems, proving chip solutions to be competitive while more energy and time efficient.",
        "Designed custom PCBs for Ising Solver Chips, enabling Raspberry Pi interfacing via voltage level shifters.",
      ],
    },
  ],

  projects: [
    {
      name: "Biquad Switched-Capacitor Active Filter",
      tech: "Cadence Virtuoso, RFIC",
      period: "Aug. 2025 – Present",
      description:
        "Specced and designed a biquad LPF for Wi-Fi receivers with programmable BW from 1.6 GHz, sub 10 nV/√Hz input referred noise, Op-Amp gain of 80 dB, and sub 1 mW power consumption in FinFET TSMC 16 nm.",
      link: "#",
    },
    {
      name: "Reconfigurable Systolic Array for Edge AI",
      tech: "Verilog, PrimeTime PX",
      period: "Jan. 2026 – May 2026",
      description:
        "Architected and designed a reconfigurable systolic array for matrix multiplication and AI inference, achieving a 50% improvement in silicon efficiency over the baseline design in GlobalFoundries 22 nm.",
      link: "#",
    },
    {
      name: "Formula SAE Power Distribution and Data Logging Module",
      tech: "Altium, STM32F7, CAN bus",
      period: "Aug. 2024 – Present",
      description:
        "Led a 4-person team to develop a power distribution and data logging system using STM32F7 MCU and CAN bus, monitoring 400+ signals across an FSAE racecar. Engineered a USB224-series high-speed USB breakout board and standalone tester for robust module validation.",
      link: "#",
    },
    {
      name: "Formula SAE Telemetry System",
      tech: "Altium, C++, STM32",
      period: "Aug. 2022 – Aug. 2024",
      description:
        "Designed PCB schematic and board in Altium for RFD900 radio communication between driverside and trackside with UART, CAN, high-speed USB, and SD card using an STM32 microcontroller. Implemented embedded systems firmware enhancing real-time data acquisition and communication.",
      link: "#",
    },
  ],

  publications: [
    {
      citation:
        'T. Islam, J. Kim, H. Yu, Z. Xue, J. Xing, C. Elash, P. Momen, L. Chen, and C. Kim, "Aging Characterization at Cryogenic Temperature with Synthesizable Odometers in 12nm and 28nm," IEEE International Reliability Physics Symposium (IRPS), 2025.',
    },
    {
      citation:
        'C. Kim, P. Kreye, A. Efe, R. Yin, C. Li, A. Kumar, T. Islam, Z. Zeng, N. Prova, A. Vanasse, X. Li, J. Xing, et al., "COBIFIVE: A Five-Core Physics-based Ising Computing Chip," Nature Electronics, 2025 (Under Review).',
    },
  ],

  honors: [
    "Graduate Fellow, Texas A&M University",
    "Summa Cum Laude, University of Minnesota",
    "Dean's List – Fall 2022, Spring 2023, Fall 2023, Spring 2024, Fall 2024, Spring 2025, Fall 2025, Spring 2026",
    "Distinction, University of Minnesota",
    "Thor Family Scholarship, University of Minnesota",
    "Oscar Schott UG Scholarship, University of Minnesota",
    "C.A. Syvertson Scholarship, University of Minnesota",
  ],

  skills: [
    {
      category: "EDA & Simulation",
      items: [
        "Cadence Virtuoso",
        "Cadence Spectre",
        "Synopsys",
        "Primewave",
        "Primesim",
        "HSPICE",
        "LTSPICE",
        "ADS Keysight",
      ],
    },
    {
      category: "HDL & Design",
      items: ["Verilog-AMS", "Verilog", "Altium", "Intel Quartus Prime", "ModelSIM", "Vivado"],
    },
    {
      category: "Languages & Tools",
      items: ["MATLAB", "Python", "C", "C++", "VS Code", "Microsoft Excel", "PowerPoint"],
    },
  ],
};

export default resumeData;
