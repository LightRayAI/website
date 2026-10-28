// Original bilingual editorial copy grounded in the user's brief and local task examples.
// Examples are scientific task excerpts, not exports of reference solutions.
const equations = {
  reasoning: String.raw`\begin{gathered}\{\gamma_a,\gamma_b\}=2\delta_{ab},\qquad a,b=1,\ldots,8,\\[4pt]H=\sum_{a<b<c<d}J_{abcd}\gamma_a\gamma_b\gamma_c\gamma_d,\\[4pt]\sum_{a<b<c<d}J_{abcd}^{\,2}=\mathcal J^2,\qquad \Delta=E_1-E_0.\end{gathered}`,
  agentic: String.raw`\begin{gathered}\Phi_p(r)=\Phi_{\rm ext}(r)+M\int p(J)\\[-1pt]\qquad\times\left\langle W_0\!\left(r,r_{\Phi_p}(J,\theta)\right)\right\rangle_\theta\,dJ,\\[4pt]\tau=t/N,\qquad J=(J_R,L).\end{gathered}`,
  trajectories: String.raw`\begin{gathered}\mathcal L=\tfrac12\sum_{a=1}^{2}(\partial\boldsymbol\phi_a)^2+\tfrac{u}{4!}\Big(\sum_a\boldsymbol\phi_a^2\Big)^2\\[4pt]+\tfrac{v}{4!}\sum_{a,b}\Big[(\boldsymbol\phi_a\!\cdot\!\boldsymbol\phi_b)^2-\boldsymbol\phi_a^2\,\boldsymbol\phi_b^2\Big],\\[4pt]\boldsymbol\phi_a\in\mathbb R^N.\end{gathered}`,
  rsi: String.raw`\begin{gathered}H=\!\sum_{(i,j)\in\mathcal B}J_{ij}\,\mathbf S_i\!\cdot\!\mathbf S_j,\quad J_{ij}>0,\\[4pt]S\in\left\{\tfrac12,1\right\},\qquad \Delta=E_1-E_0.\end{gathered}`,
};
export const dataBusiness = {
  en: {
    eyebrow: 'SCIENTIFIC DATA INFRASTRUCTURE', title: 'The work of discovery,\nmade learnable.',
    thesis: 'Research-grade data, executable environments, and verification systems for training and evaluating scientific AI.',
    intro: 'Research involves deciding which questions are worth asking, translating theory into computation, revising a hypothesis when experiments disagree, and establishing whether a result holds. We turn that experience into reasoning data, executable research tasks, and records of scientist–AI collaboration. The material retains the methods, constraints, and scientific judgment of the original work.',
    deliveryProof: { label: 'Close collaborations', partners: ['ByteDance', 'Alibaba'], metric: '1,000+', metricLabel: 'Scientific data items and tasks delivered' },
    principlesLabel: 'Expert-led Human-in-the-Loop Production', principlesTitle: 'Built by the researchers behind the questions.',
    principles: [
      ['Problem formulation', 'We draw on our research to identify questions that matter, state their assumptions, and specify what a solution must establish. Model trials inform a capability map of where reasoning or execution breaks down.'],
      ['Executable research workflows', 'We turn research methods into tasks an agent can execute, with a defined working state, scientific software, and dependencies between stages. Experiments, debugging, and revisions remain part of the record.'],
      ['Scientific verification', 'We establish what a valid result must satisfy, using theory, independent calculations, and domain expertise. Reference solutions, numerical tolerances, and executable checks are reviewed alongside sources of error and valid alternative approaches.'],
    ],
    capabilities: 'FOUR DATA FAMILIES', capabilitiesTitle: 'From scientific reasoning to sustained model improvement.',
    capabilitiesIntro: 'The data takes different forms depending on what a model needs to learn: a derivation, a sequence of scientific computations, a research collaboration, or repeated improvement of a method.',
    exampleLabel: 'Task excerpt', questionLabel: 'Your task', originalLabel: 'English original', translatedLabel: '（翻译）', switchToEnglish: 'Read this example in English', switchToChinese: 'Read this example in Chinese', switchedToEnglish: 'This example is now in English.', switchedToChinese: 'This example is now in Chinese.',
    products: [
      {
        id: 'reasoning', number: '01', title: 'Frontier Scientific Reasoning', unit: 'A complete scientific derivation',
        text: 'We develop tasks requiring sustained, multi-step scientific reasoning from research papers and questions that arise in our own work. Each task states the assumptions and target, with an expert derivation and checks on the intermediate results.',
        items: ['Expert derivations and reference answers', 'Intermediate results with explicit assumptions', 'Symbolic and numerical verification'],
        example: {
          tag: 'CritPt-style · Quantum many-body physics', title: 'The optimal gap of eight Majorana modes',
          brief: 'Eight Majorana operators act irreducibly on the full sixteen-dimensional Fock space. In a fixed Majorana basis, allow only real quartic interactions, fix the squared norm of all coupling coefficients, and require a nondegenerate ground state. Define the excitation gap using the complete spectrum, including both fermion-parity sectors.',
          equation: equations.reasoning,
          question: 'Determine the globally maximal gap and characterize every maximizing Hamiltonian in state/operator form. Among those maximizers, find the smallest number of nonzero quartic couplings and give an explicit construction. Prove both global optimality and the coupling-count lower bound, and establish the construction’s full spectrum and ground-state properties.',
        },
      },
      {
        id: 'agentic', number: '02', title: 'Agentic Science RL Environments', unit: 'An executable research workflow',
        text: 'Research tasks with a working scientific software environment and an executable verifier. The design draws on PRBench’s paper-reproduction setting and targets workflows of comparable complexity to Terminal-Bench-Science, with feedback tied to specific scientific outputs.',
        items: ['Scientific context, domain software, and an output specification', 'Independently checked references and verifiers', 'Per-observable tolerances, scoring weights, and partial credit'],
        example: {
          tag: 'Agentic science · Gravitational dynamics', title: 'Collective feedback in a self-consistent disk',
          brief: 'Consider equal-mass particles moving in a plane with softened gravitational interactions in the axisymmetric and quadrupolar harmonics. The full task supplies the interaction kernels and initial phase-space distribution. The external potential is fixed so the initial total mean potential is ln r; as the action distribution evolves, the mean field must remain self-consistent.',
          equation: equations.agentic,
          question: 'On the initially stable axisymmetric branch, take the weak ensemble limit before the right derivative at τ = 0. Compute six responses: radial heating, inward transport, mean-potential change, log band-power change, and shifts in spectral centroid and variance. Implement the calculation in an offline Python/NumPy environment and submit the observables with source code and a numerical-check report.',
        },
      },
      {
        id: 'trajectories', number: '03', title: 'Scientist–AI Research Trajectories', unit: 'A multi-turn scientific collaboration',
        text: 'Records of scientists and AI agents working through a research problem together. Conversations are kept with their tool calls, experimental observations, and intermediate artifacts, so a change of plan can be understood in light of the evidence available at the time.',
        items: ['Expert guidance on research decisions', 'Complete tool calls, observations, and intermediate artifacts', 'Failed attempts, corrections, and changes of direction'],
        example: {
          tag: 'Scientist–AI collaboration · Statistical field theory', categoryLabel: 'Trajectory excerpt', title: 'Chiral criticality in O(N)×O(2) frustrated magnets',
          brief: 'Stacked triangular antiferromagnets and helimagnets order through two orthogonal N-component vectors, described by an O(N)×O(2) Landau–Ginzburg–Wilson theory. For the physical cases N = 2 and 3, methods have disagreed for more than two decades on whether the transition is continuous: fixed-dimension perturbation theory finds a fixed point that other approaches do not support.',
          equation: equations.trajectories,
          questionLabel: 'Research question',
          question: 'Can high-order perturbation theory combined with large fuzzy-sphere calculations decide whether this fixed point is genuine?',
        },
      },
      {
        id: 'rsi', number: '04', title: 'RSI Research Challenges', unit: 'An improved scientific method',
        text: 'Tasks in which an agent improves a working scientific method through repeated experiments. The agent can change an implementation, test a hypothesis, keep a useful modification, or revert an unsuccessful one. We evaluate the final method together with the experimental record.',
        items: ['Executable baselines, explicit objectives, and resource budgets', 'Experiments, metrics, and keep-or-revert decisions recorded by version', 'Independent re-execution and comparison with reference methods'],
        example: {
          tag: 'RSI task design · Quantum chemistry', title: 'Iteratively improving a DMRG solver',
          brief: 'Start from a working finite-system DMRG solver for antiferromagnetic spin-½ and spin-1 Heisenberg chains. The setting includes open and periodic boundaries; the full task also specifies softened edge bonds. The solver must return ground-state and excited-state energies, gaps, reduced-density-matrix eigenvalues, bond strengths, or local magnetizations as requested.',
          equation: equations.rsi,
          question: 'Improve the NumPy/SciPy implementation over multiple research rounds. Propose changes to retained states, sweep scheduling, or numerical execution; run controlled experiments and retain or revert each change using its evidence. Preserve the observable definitions and report accuracy, convergence, runtime, and resource cost. Compare against strong reference and SOTA methods under matched conditions.',
        },
      },
    ],
    foundation: 'Related research', foundationText: 'Our work on PHYBench and PRBench informs task construction and scientific evaluation. ColliderAgent provides experience with research software and execution; RSI-Exam addresses how improvements should be measured.',
    contactTitle: 'Scientific data collaborations', contactText: 'Tell us about the scientific domain, the capabilities you want to develop, and the data or research environment you need.', contactCta: 'Discuss a collaboration',
  },
  zh: {
    eyebrow: '科学数据基础设施', title: '将科学探索的过程，\n转化为智能的学习经验。',
    thesis: '面向科学 AI 训练与评测的研究级数据、可执行环境和验证体系。',
    intro: '科学研究积累着模型理解复杂世界所需的经验：如何提出值得研究的问题，如何连接理论与计算，如何依据实验修正判断，以及如何确认一个结果成立。我们将这些经验构建为长程推理数据、可执行科研环境与多轮研究轨迹，让科研中的方法、约束与判断进入模型训练。',
    deliveryProof: { label: '深度合作', partners: ['字节跳动', '阿里巴巴'], metric: '1,000+', metricLabel: '累计交付科学数据与任务' },
    principlesLabel: '专家主导的人机协同生产', principlesTitle: '研究问题的提出者，也是训练任务的构建者。',
    principles: [
      ['问题定义', '选题来自团队的研究工作。我们判断问题的科学意义，明确其假设、条件与求解目标，再结合模型试跑建立能力地图，定位值得训练的薄弱环节。'],
      ['科研过程的形式化', '把论文方法和研究流程落实为可运行的任务：定义工作状态，配置专业工具，保留各步骤之间的依赖，以及实验、调试和修订的记录。'],
      ['科学验证', '依据理论、独立计算和领域经验确定结果应满足的条件，再将其落实为参考解、数值容差和验证器。正确性、误差来源和合理替代解法都需要经过科学复核。'],
    ],
    capabilities: '四类数据与环境', capabilitiesTitle: '从长程科学推理，到持续模型改进。',
    capabilitiesIntro: '根据模型需要学习的能力，分别提供完整推导、科学计算流程、科研协作记录与多轮方法改进任务。',
    exampleLabel: '题面节选', questionLabel: '求解任务', originalLabel: 'English original', translatedLabel: '（翻译）', switchToEnglish: '查看此示例的英文原文', switchToChinese: '查看此示例的中文译文', switchedToEnglish: '当前示例已切换为英文原文。', switchedToChinese: '当前示例已切换为中文译文。',
    products: [
      {
        id: 'reasoning', number: '01', title: '前沿科学长程推理数据', unit: '完整的科学推导',
        text: '从研究论文与实际课题中提炼需要长程推理的问题，明确前提假设和求解目标，配套专家推导、关键中间结果与核验依据。',
        items: ['专家推导与参考答案', '前提明确的关键中间结果', '符号与数值交叉验证'],
        example: {
          tag: 'CritPt 类型 · 量子多体物理', title: '八 Majorana 模式的最优能隙',
          brief: '八个 Majorana 算符不可约地作用于完整的十六维 Fock 空间。在固定的 Majorana 基底下，只允许实系数四体相互作用，固定全部耦合系数的平方和，并要求基态非简并。激发能隙由完整能谱定义，必须同时包含两个费米子宇称扇区。',
          equation: equations.reasoning,
          question: '求全局最大的能隙，并用态或算符形式刻画所有达到上界的哈密顿量。在这些最优解中，进一步求非零四体耦合项的最少数量，给出显式构造，证明能隙的全局最优性与耦合项数下界，并确定该构造的完整能谱和基态性质。',
        },
      },
      {
        id: 'agentic', number: '02', title: '科研 Agent 强化学习环境', unit: '可执行的完整科研流程',
        text: '在真实科学软件环境中开展完整科研任务，并以可执行验证器核验结果。任务设计基于 PRBench 的论文复现经验，面向 Terminal-Bench-Science 级别的工作流复杂度，为各项科学产物定义明确反馈。',
        items: ['科学背景、专业软件与输出规范', '独立核验的参考结果和验证器', '逐项容差、评分权重与部分得分规则'],
        example: {
          tag: '科研 Agent · 引力动力学', title: '自洽引力圆盘中的集体反馈',
          brief: '考虑平面内运动的等质量粒子，采用轴对称与四极谐波分量的软化引力相互作用。完整题目给定相互作用核与初始相空间分布，固定外势，使初始总平均势为 ln r；作用量分布演化时，平均引力场必须保持自洽。',
          equation: equations.agentic,
          question: '在初始稳定的轴对称分支上，先取弱系综极限，再求 τ = 0 处的右导数。计算径向加热、向内输运、平均势变化、频带功率对数变化，以及谱质心和谱方差变化六项响应。在离线 Python/NumPy 环境中实现计算，提交各观测量、源码与数值检查报告。',
        },
      },
      {
        id: 'trajectories', number: '03', title: '科学家—AI 多轮科研轨迹', unit: '多轮科学协作过程',
        text: '记录科学家与 AI 智能体共同推进一项研究的过程。对话、工具调用、实验观察和中间产物相互对应，使每次判断、修正与转向都能追溯到当时掌握的证据。',
        items: ['关键研究决策中的专家指导', '完整工具调用、实验观察与中间产物', '失败尝试、纠错与研究转向'],
        example: {
          tag: '科学家—AI 协作 · 统计场论', categoryLabel: '轨迹节选', title: 'O(N)×O(2) 阻挫磁体的手征临界性',
          brief: '层状三角格子反铁磁体与螺旋磁体的序参量是两个相互正交的 N 维矢量，对应 O(N)×O(2) 的 Landau–Ginzburg–Wilson 理论。对物理上的 N = 2、3，相变是否连续已争论二十多年：固定维数微扰论给出一个不动点，其他方法却不支持它的存在。',
          equation: equations.trajectories,
          questionLabel: '研究问题',
          question: '高阶微扰论与大尺寸 fuzzy sphere 计算相结合，能否判定这个不动点的真伪？',
        },
      },
      {
        id: 'rsi', number: '04', title: '科研递归自我改进（RSI）', unit: '得到改进的科学方法',
        text: '给定可运行的科学方法和计算预算，让智能体通过多轮实验改进实现、检验假设，并保留有效改动或回退失败方案。评测同时考察最终方法与实验记录。',
        items: ['可执行基线、明确目标与资源预算', '逐版本记录的实验、指标与保留或回退决策', '独立重执行与参考方法对照'],
        example: {
          tag: 'RSI 任务设计 · 量子化学', title: 'DMRG 求解器的多轮迭代优化',
          brief: '从反铁磁自旋 ½ 与自旋 1 海森堡链的可运行有限系统 DMRG 求解器出发。考虑开放与周期边界，完整任务另有软化端点耦合的规定。求解器应按请求返回基态和激发态能量、能隙、约化密度矩阵本征值、键强度或局域磁化。',
          equation: equations.rsi,
          question: '围绕 NumPy/SciPy 实现进行多轮研究：提出保留态数、扫掠安排或数值执行方式的改进，开展受控实验，并根据证据保留或回退每项变更。保持观测量定义一致，报告精度、收敛性、运行时间与资源开销，并在一致条件下与强参考及 SOTA 方法进行对照。',
        },
      },
    ],
    foundation: '相关研究', foundationText: 'PHYBench 与 PRBench 的研究支撑任务构建和科学评测；ColliderAgent 提供专业科研软件与执行流程的实践，RSI-Exam 则研究如何衡量方法改进。',
    contactTitle: '科学数据合作', contactText: '欢迎就目标学科、模型能力和所需的数据或科研环境，与我们交流。', contactCta: '联系团队',
  },
};
