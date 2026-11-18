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
      monogram: "M",
      role: "Software Engineer Intern",
      period: "Jan – May 2026",
      location: "Remote",
      summary: "Built banking and fintech product features for startups and businesses."
    },
    {
      company: "Intuit",
      monogram: "I",
      role: "Software Engineer Intern",
      period: "May – Aug 2025",
      location: "Mountain View, CA",
      summary: "Engineered features on QuickBooks Online within the Chart of Accounts team."
    },
    {
      company: "University of Minnesota",
      monogram: "U",
      role: "B.S. in Computer Science",
      period: "Minneapolis, MN",
      location: "Minneapolis, MN",
      summary: "Systems programming, algorithms, data structures, and software engineering."
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

  // Add, edit, or remove articles here! Each note automatically gets its own
  // shareable link (#note/your-slug) and clean distraction-free reader view.
  notes: [
    {
      slug: "pre-handshake-tls-inspection",
      title: "Inspecting TLS ClientHello on the Wire Before Handshake Completion",
      date: "2026-11",
      readTime: "4 min read",
      excerpt: "How JA4 fingerprinting and pre-handshake policy checks stop spoofed HTTP clients before spending CPU on TLS termination.",
      paragraphs: [
        "Most HTTP reverse proxies inspect traffic only after completing the TLS handshake. Under automated scraping or volumetric floods, terminating TLS first means burning asymmetric cryptography CPU cycles on clients that could have been rejected on their very first TCP packet.",
        "While building TLSGate, I implemented a non-blocking wire parser that peeks the initial RFC 8446 ClientHello record directly from raw TCP buffers—extracting cipher suites, ALPN, SNI, supported versions, and extension ordering while stripping RFC 8701 GREASE values to compute a deterministic JA4 fingerprint.",
        "Comparing that wire-level TLS fingerprint against the decrypted HTTP User-Agent immediately exposes bots impersonating Chrome or Safari with Python, Go, or curl TLS stacks—while high-confidence offenders can be pushed down to an eBPF/XDP map for kernel-level drops."
      ]
    },
    {
      slug: "rootless-linux-sandboxing",
      title: "Fast Rootless Code Sandboxing Without a Container Daemon",
      date: "2026-10",
      readTime: "4 min read",
      excerpt: "Combining pre-warmed zygote workers with Linux namespaces, overlayfs, cgroups v2, and seccomp-BPF.",
      paragraphs: [
        "Spinning up a full container runtime for short-lived, untrusted code snippets introduces hundreds of milliseconds of cold-start overhead. Yet running untrusted workloads in bare subprocesses leaves the host filesystem, network, and syscall surface exposed.",
        "In CageRun, a pool of pre-warmed zygote workers amortizes runtime initialization. Each incoming job clones isolated user, PID, mount, IPC, and network namespaces, pivots into a disposable overlayfs root, attaches cgroups v2 memory/CPU/PID quotas, and locks down syscalls with a compiled seccomp-BPF filter before executing user bytes.",
        "Pairing seccomp enforcement with C eBPF tracepoints over a ring buffer gives both hard kernel isolation and structured audit trails whenever untrusted code probes a restricted boundary."
      ]
    },
    {
      slug: "shipping-in-large-codebases",
      title: "What Internships Taught Me About Shipping in Production Codebases",
      date: "2026-06",
      readTime: "3 min read",
      excerpt: "Notes from building financial and accounting software at Mercury and Intuit.",
      paragraphs: [
        "Building side projects at 2am rewards raw speed: you hold the entire data model in your head and ship straight to main. Working on production financial software—like startup banking workflows at Mercury and QuickBooks Online at Intuit—flips that equation.",
        "In systems handling real money and accounting ledgers, tracing existing invariants, designing explicit state transitions, and writing thorough tests matter far more than clever abstractions. Small schema or UI changes ripple across years of customer workflows.",
        "The biggest takeaway for me has been treating clarity as an engineering feature: small pull requests, predictable failure modes, and leaving every module easier to reason about than I found it."
      ]
    }
  ]
};
