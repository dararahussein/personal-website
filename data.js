// ============================================================================
// PORTFOLIO CONTENT — Edit everything on your site from this single file!
// ============================================================================

window.PORTFOLIO_DATA = {
  profile: {
    name: "Darara Hussein",
    headline: "Software Engineer",
    subheadline: "Computer Science @ University of Minnesota",
    location: "Minneapolis, MN",
    timeZone: "America/Chicago",
    status: "Open to software engineering opportunities",
    email: "husse299@umn.edu",
    // Drop your PDF into this folder as "resume.pdf" and set resumeUrl: "./resume.pdf"
    // to display the Resume button automatically:
    resumeUrl: "",
    bio: [
      "I'm a computer science student at the University of Minnesota focused on systems infrastructure, backend engineering, and financial software.",
      "Previously, I interned as a software engineer at Mercury building banking & fintech products, and at Intuit on the QuickBooks Online Chart of Accounts team."
    ],
    socials: [
      { label: "GitHub", url: "https://github.com/dararahussein" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/dararahussein/" }
    ]
  },

  experience: [
    {
      company: "Mercury",
      logo: "./assets/mercury.png",
      monogram: "M",
      role: "Software Engineer Intern",
      period: "Jan – May 2026",
      location: "Remote",
      summary: "Built banking and fintech product features for startups and businesses."
    },
    {
      company: "Intuit",
      logo: "./assets/intuit.png",
      monogram: "I",
      role: "Software Engineer Intern",
      period: "May – Aug 2025",
      location: "Mountain View, CA",
      summary: "Engineered features on QuickBooks Online within the Chart of Accounts team."
    },
    {
      company: "University of Minnesota",
      logo: "./assets/umn.png",
      monogram: "U",
      role: "Bachelor of Arts in Computer Science",
      period: "Minneapolis, MN",
      location: "Minneapolis, MN",
      summary: ""
    }
  ],

  projects: [
    {
      id: "meridian",
      title: "Meridian",
      year: "2026",
      summary: "Stateful multi-agent DAG workflow runtime, hybrid RAG engine, evaluation harness, and trace observability platform.",
      details: [
        "Executes parallel fan-out/fan-in agentic DAGs with persistent state checkpoints, conditional routing, circuit breakers, and deterministic step replay.",
        "Combines AST/recursive chunking, BM25 lexical search + dense vector retrieval with Reciprocal Rank Fusion (RRF), runtime guardrails, and hierarchical span tracing."
      ],
      tags: ["Python", "FastAPI", "React / TypeScript", "Hybrid RAG", "Observability"],
      repoUrl: "https://github.com/dararahussein/meridian",
      liveUrl: ""
    },
    {
      id: "tlsgate",
      title: "TLSGate",
      year: "2026",
      summary: "Non-blocking L4/L7 reverse proxy with wire-level TLS ClientHello JA4 fingerprinting, Redis Lua rate limiting, and eBPF/XDP fast-path drops.",
      details: [
        "Peeks raw RFC 8446 TLS ClientHello frames prior to handshake completion, filters GREASE values, and computes deterministic JA4 fingerprints to flag spoofed User-Agents before asymmetric crypto.",
        "Pairs an L1 LRU cache with atomic Redis Lua sliding-window counters and an optional Linux eBPF/XDP kernel map to drop repeat flood traffic at the NIC driver layer."
      ],
      tags: ["Python", "Asyncio", "TLS / JA4", "Redis Lua", "C / eBPF XDP"],
      repoUrl: "https://github.com/dararahussein/tlsgate",
      liveUrl: ""
    },
    {
      id: "cagerun",
      title: "CageRun",
      year: "2026",
      summary: "Rootless Linux micro-sandbox and eBPF syscall enforcement runtime for executing untrusted code with low cold-start latency.",
      details: [
        "Constructs ephemeral sandboxes directly from Linux kernel primitives (user/PID/net/mount namespaces, overlayfs, pivot_root, cgroups v2, and compiled seccomp-BPF filters) via a pre-warmed zygote worker pool.",
        "Streams kernel-level syscall telemetry over C eBPF tracepoints and ring buffers into a FastAPI/Redis/PostgreSQL control plane."
      ],
      tags: ["Python", "C / eBPF", "Linux Namespaces", "seccomp-BPF", "cgroups v2"],
      repoUrl: "https://github.com/dararahussein/cagerun",
      liveUrl: ""
    }
  ],

  // Leave empty [] to display the "Under construction" note banner.
  // When you're ready to publish a note, add an object using this format:
  // {
  //   slug: "my-first-note",
  //   title: "Title of Your Note",
  //   date: "2026-12",
  //   readTime: "3 min read",
  //   paragraphs: [
  //     "First paragraph...",
  //     "Second paragraph..."
  //   ]
  // }
  notes: []
};
