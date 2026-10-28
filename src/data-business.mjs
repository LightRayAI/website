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
    eyebrow: 'DATA BUSINESS', title: 'Frontier research. Frontier data.\nAdvancing together.',
    thesis: 'We believe frontier data for long-horizon scientific work must be deeply grounded in real research.',
    intro: 'Stronger scientific capability significantly improves a model’s ability to generalize. We develop scientific data as we advance research. New questions, pivotal derivations, experimental feedback, and methodological breakthroughs become demanding tasks, complete research trajectories, and reliable evaluation criteria. Our data carries the assumptions, tools, and evidence of the work it comes from. As our research progresses, we continually improve the scientific depth and training value of our data.',
    deliveryProof: { label: 'Close collaborations', partners: ['ByteDance', 'Alibaba'], metric: '1,000+', metricLabel: 'Scientific data items and tasks delivered' },
    principlesLabel: 'RESEARCH AT THE CORE', principlesTitle: 'The research behind the data makes the difference.',
    principles: [
      ['Research progress shapes data development', 'New scientific questions reveal new capability demands. Advances in methods provide stronger reference approaches, while real failures expose unresolved weaknesses. These findings continuously inform our tasks, trajectories, and evaluation objectives.'],
      ['Capability maps grounded in real research', 'We examine how models handle derivation, scientific tools, numerical computation, and error correction within complete research workflows. This locates the bottlenecks in long-horizon execution and turns them into targeted learning opportunities.'],
      ['Expert-led Human-in-the-Loop Production', 'Domain scientists guide problem selection, derivations, experiment design, and interpretation, while coding agents assist implementation and repeated execution. Experts remain involved from the research objective and scientific context through independent checks and verifier review.'],
      ['The structure of real scientific work', 'Tasks retain the constraints and dependencies of research. Tool use, experimental feedback, and revisions remain connected to earlier assumptions and results. This keeps the training signal aligned with the work we want scientific AI to perform.'],
    ],
    capabilities: 'FOUR DATA FAMILIES', capabilitiesTitle: 'From scientific reasoning to sustained model improvement.',
    capabilitiesIntro: 'Four forms of the same scientific work: the reasoning behind a result, the workflow that produces it, the collaboration that advances it, and the method that improves through experimentation.',
    exampleLabel: 'Task excerpt', questionLabel: 'Your task', originalLabel: 'English original', translatedLabel: '（翻译）', switchToEnglish: 'Read this example in English', switchToChinese: 'Read this example in Chinese', switchedToEnglish: 'This example is now in English.', switchedToChinese: 'This example is now in Chinese.',
    products: [
      {
        id: 'reasoning', number: '01', title: 'Frontier Scientific Reasoning', unit: 'A complete scientific derivation',
        text: 'Long-horizon reasoning data built around the central arguments of frontier physics papers and other advanced scientific work. Experts reconstruct the reasoning, make assumptions explicit, and develop new, well-posed questions.',
        items: ['Full expert derivations and reference answers', 'Key intermediate results and fine-grained acceptance criteria', 'Symbolic and numerical cross-checks; model-based difficulty calibration'],
        example: {
          tag: 'CritPt-style · Quantum many-body physics', title: 'The optimal gap of eight Majorana modes',
          brief: 'Eight Majorana operators act irreducibly on the full sixteen-dimensional Fock space. In a fixed Majorana basis, allow only real quartic interactions, fix the squared norm of all coupling coefficients, and require a nondegenerate ground state. Define the excitation gap using the complete spectrum, including both fermion-parity sectors.',
          equation: equations.reasoning,
          question: 'Determine the globally maximal gap and characterize every maximizing Hamiltonian in state/operator form. Among those maximizers, find the smallest number of nonzero quartic couplings and give an explicit construction. Prove both global optimality and the coupling-count lower bound, and establish the construction’s full spectrum and ground-state properties.',
        },
      },
      {
        id: 'agentic', number: '02', title: 'Agentic Science RL Environments', unit: 'An executable research workflow',
        text: 'RL-ready environments for complete, research-level scientific workflows. Building on PRBench’s reproduction and verification approach, we design for Terminal-Bench-Science-level workflow complexity, with domain tools, strict verifiers, and detailed point-by-point rewards.',
        items: ['Scientific context, working software, and a clear output contract', 'Expert-checked reference results and independently reviewed verifiers', 'Observable-specific tolerances, scoring weights, and partial credit'],
        example: {
          tag: 'Agentic science · Gravitational dynamics', title: 'Collective feedback in a self-consistent disk',
          brief: 'Consider equal-mass particles moving in a plane with softened gravitational interactions in the axisymmetric and quadrupolar harmonics. The full task supplies the interaction kernels and initial phase-space distribution. The external potential is fixed so the initial total mean potential is ln r; as the action distribution evolves, the mean field must remain self-consistent.',
          equation: equations.agentic,
          question: 'On the initially stable axisymmetric branch, take the weak ensemble limit before the right derivative at τ = 0. Compute six responses: radial heating, inward transport, mean-potential change, log band-power change, and shifts in spectral centroid and variance. Implement the calculation in an offline Python/NumPy environment and submit the observables with source code and a numerical-check report.',
        },
      },
      {
        id: 'trajectories', number: '03', title: 'Scientist–AI Research Trajectories', unit: 'A multi-turn scientific collaboration',
        text: 'Interactions between domain scientists and AI agents working toward research advances across disciplines. The data connects expert guidance, agent decisions, complete tool calls, experimental evidence, and revisions over multiple turns.',
        items: ['Expert feedback at substantive research decisions', 'Complete tool calls, execution observations, and intermediate artifacts', 'Preserved failed attempts, corrections, and changes of direction'],
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
        text: 'Difficult scientific problems for recursive self-improvement. Agents start from a working method, repeatedly propose and test changes, and retain or revert them based on evidence. Evaluation measures the resulting method, alongside the full improvement process.',
        items: ['Executable baselines, explicit objectives, and fixed resource budgets', 'Versioned experiments, code changes, feedback, and rollback decisions', 'Independent re-execution and comparisons with strong reference methods'],
        example: {
          tag: 'RSI task design · Quantum chemistry', title: 'Iteratively improving a DMRG solver',
          brief: 'Start from a working finite-system DMRG solver for antiferromagnetic spin-½ and spin-1 Heisenberg chains. The setting includes open and periodic boundaries; the full task also specifies softened edge bonds. The solver must return ground-state and excited-state energies, gaps, reduced-density-matrix eigenvalues, bond strengths, or local magnetizations as requested.',
          equation: equations.rsi,
          question: 'Improve the NumPy/SciPy implementation over multiple research rounds. Propose changes to retained states, sweep scheduling, or numerical execution; run controlled experiments and retain or revert each change using its evidence. Preserve the observable definitions and report accuracy, convergence, runtime, and resource cost. Compare against strong reference and SOTA methods under matched conditions.',
        },
      },
    ],
    foundation: 'A research program that continually informs our data', foundationText: 'PHYBench, PRBench, ColliderAgent, and RSI-Exam connect scientific reasoning, research execution, and self-improvement. Research exposes new capability limits; evaluation helps identify the next questions. These findings feed back into the data and environments we build.',
    contactTitle: 'Which scientific capability comes next?', contactText: 'Talk with us about your target domains, model capability gaps, and requirements for scientific data or executable environments.', contactCta: 'Discuss a data collaboration',
  },
  zh: {
    eyebrow: '数据业务', title: '前沿科研与前沿数据，\n同源共进。',
    thesis: '我们相信，真正的前沿长程数据，必须与真实科研深度绑定。',
    intro: '科学能力的增强对于模型的泛化能力具有显著作用。我们在推进科研的过程中构建数据。研究中的新问题、关键推导、实验反馈与方法突破，持续转化为高难度任务、完整科研轨迹和可靠评测标准。数据保留其所源自研究的假设、工具与证据链；随着科研推进，我们持续提升数据的科学深度与训练价值。',
    deliveryProof: { label: '深度合作', partners: ['字节跳动', '阿里巴巴'], metric: '1,000+', metricLabel: '累计交付科学数据与任务' },
    principlesLabel: '以科研为核心', principlesTitle: '数据的深度，来自持续推进的研究。',
    principles: [
      ['科研进展驱动数据演进', '新课题带来新的能力要求，方法进展提供更高质量的参考路径，真实失败揭示尚未解决的短板。这些研究发现持续进入我们的题目、轨迹和评测目标。'],
      ['基于真实研究的能力地图', '在完整科研流程中考察模型的推导、专业工具调用、数值计算与纠错能力，定位长程研究链中真正受限的环节，并将这些缺口转化为有针对性的训练任务。'],
      ['专家主导的人机协同生产', '领域科学家指导选题、推导、实验设计与结果解释，Coding Agent 辅助实现与重复执行。从研究目标和科学上下文，到独立核验与验证器复审，关键科学判断始终由专家把关。'],
      ['保留真实科研的长程结构', '题目保留研究中的关键约束与前后依赖，工具调用、实验反馈和方案修订连接此前的假设与结果。训练信号因此与科学 AI 未来参与研究的实际工作方式保持一致。'],
    ],
    capabilities: '四类数据与环境', capabilitiesTitle: '从长程科学推理，到持续模型改进。',
    capabilitiesIntro: '同一科研过程的四种表达：结论背后的推理，产出结果的工作流，推进研究的多轮协作，以及在实验中持续改进的方法。',
    exampleLabel: '题面节选', questionLabel: '求解任务', originalLabel: 'English original', translatedLabel: '（翻译）', switchToEnglish: '查看此示例的英文原文', switchToChinese: '查看此示例的中文译文', switchedToEnglish: '当前示例已切换为英文原文。', switchedToChinese: '当前示例已切换为中文译文。',
    products: [
      {
        id: 'reasoning', number: '01', title: '前沿科学长程推理数据', unit: '完整的科学推导',
        text: '围绕前沿物理论文及其他高阶科学研究的核心思维链，重建完整推导、明确关键假设，并构造新的、定义良好的科学问题。将专家研究过程转化为可学习、可核验的长程推理数据。',
        items: ['完整专家推导与参考答案', '关键中间结果与细粒度验收标准', '符号与数值交叉核验，结合模型试跑校准难度'],
        example: {
          tag: 'CritPt 类型 · 量子多体物理', title: '八 Majorana 模式的最优能隙',
          brief: '八个 Majorana 算符不可约地作用于完整的十六维 Fock 空间。在固定的 Majorana 基底下，只允许实系数四体相互作用，固定全部耦合系数的平方和，并要求基态非简并。激发能隙由完整能谱定义，必须同时包含两个费米子宇称扇区。',
          equation: equations.reasoning,
          question: '求全局最大的能隙，并用态或算符形式刻画所有达到上界的哈密顿量。在这些最优解中，进一步求非零四体耦合项的最少数量，给出显式构造，证明能隙的全局最优性与耦合项数下界，并确定该构造的完整能谱和基态性质。',
        },
      },
      {
        id: 'agentic', number: '02', title: '科研 Agent 强化学习环境', unit: '可执行的完整科研流程',
        text: '面向前沿研究级别的完整科学工作流，构建可适配强化学习的 Agentic 环境。沿用 PRBench 的论文复现与核验方法，以 Terminal-Bench-Science 级别的工作流复杂度为设计目标，配备专业工具、严格验证器与逐点评分细则。',
        items: ['自洽科学背景、真实软件环境与明确输出要求', '专家核验的参考结果与独立复审的验证器', '按观测量定义容差、分值与部分得分规则'],
        example: {
          tag: '科研 Agent · 引力动力学', title: '自洽引力盘中的集体反馈',
          brief: '考虑平面内运动的等质量粒子，采用轴对称与四极谐波分量的软化引力相互作用。完整题目给定相互作用核与初始相空间分布，固定外势，使初始总平均势为 ln r；作用量分布演化时，平均引力场必须保持自洽。',
          equation: equations.agentic,
          question: '在初始稳定的轴对称分支上，先取弱系综极限，再求 τ = 0 处的右导数。计算径向加热、向内输运、平均势变化、频带功率对数变化，以及谱质心和谱方差变化六项响应。在离线 Python/NumPy 环境中实现计算，提交各观测量、源码与数值检查报告。',
        },
      },
      {
        id: 'trajectories', number: '03', title: '科学家—AI 多轮科研轨迹', unit: '多轮科学协作过程',
        text: '记录多领域科学家与 AI 智能体共同推进前沿研究的多轮交互，将专家指导、智能体决策、完整工具调用、实验反馈与方案修订连接为连续的科研过程。',
        items: ['关键科研决策节点的专家反馈', '完整工具调用、执行观察与中间产物', '保留失败尝试、纠错与研究方向调整'],
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
        text: '围绕高难度科学问题，从一个可运行的方法出发，让智能体反复提出改进、开展实验、分析反馈并保留或回退方案，同时评估最终方法和完整的多轮改进过程。',
        items: ['可执行基线、明确优化目标与固定资源预算', '版本化实验、代码变更、反馈与回退决策', '独立重执行，并与强参考方法进行对照'],
        example: {
          tag: 'RSI 任务设计 · 量子化学', title: 'DMRG 求解器的多轮迭代优化',
          brief: '从反铁磁自旋 ½ 与自旋 1 海森堡链的可运行有限系统 DMRG 求解器出发。考虑开放与周期边界，完整任务另有软化端点耦合的规定。求解器应按请求返回基态和激发态能量、能隙、约化密度矩阵本征值、键强度或局域磁化。',
          equation: equations.rsi,
          question: '围绕 NumPy/SciPy 实现进行多轮研究：提出保留态数、扫掠安排或数值执行方式的改进，开展受控实验，并根据证据保留或回退每项变更。保持观测量定义一致，报告精度、收敛性、运行时间与资源开销，并在一致条件下与强参考及 SOTA 方法进行对照。',
        },
      },
    ],
    foundation: '科研进展，持续进入数据。', foundationText: 'PHYBench、PRBench、ColliderAgent 与 RSI-Exam 连接了科学推理、科研执行和持续自我改进。研究暴露新的能力边界，评测帮助定位下一步问题；这些积累持续进入我们构建的数据与科研环境。',
    contactTitle: '下一步，要提升哪一种科学能力？', contactText: '欢迎交流目标学科、模型能力缺口，以及科学数据与可执行环境的具体需求。', contactCta: '洽谈数据合作',
  },
};
