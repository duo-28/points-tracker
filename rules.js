const rules = [
    "Respect your classmates and teacher.",
    "Raise your hand before asking a question.",
    "Do not run around the classroom.",
    "Do not distract the class.",
    "Follow the teacher's instructions."
]

document.addEventListener('DOMContentLoaded', () => {
    const rulesTable = document.getElementById('rules-table');

    function updateRules() {
        rules.forEach((rule, index) => {
            const ruleNum = document.createElement('div');
            const ruleText = document.createElement('div');
            ruleNum.className = 'rule-number';
            ruleText.className = 'rule-text';
            ruleNum.textContent = index + 1;
            ruleText.textContent = rule;
            rulesTable.appendChild(ruleNum);
            rulesTable.appendChild(ruleText);
        });
    }

    updateRules();
});