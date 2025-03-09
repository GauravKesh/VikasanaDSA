import Markdown from 'react-markdown'
import axios from 'axios';
import { useState } from 'react';

const DIVISION_TASK_MARKDOWN = `
# Division Task

🔗 *[Learn about division operators in the Tutorial tab](#)*

## 📋 Task Description

The provided code stub reads two integers, \( a \) and \( b \), from STDIN. Your task is to:

- **Add logic to print two lines**:
  - The **first line** should display the result of **integer division**, \( a // b \).
  - The **second line** should display the result of **float division**, \( a / b \).
- No rounding or formatting is necessary.

### 📌 Example

For \( a = 3 \) and \( b = 5 \):

- The result of integer division \( 3 // 5 = 0 \)
- The result of float division \( 3 / 5 = 0.6 \)

**Expected Output:**

\`\`\`plaintext
0
0.6
\`\`\`

## 📥 Input Format

- The **first line** contains the first integer, \( a \).
- The **second line** contains the second integer, \( b \).

## 📤 Output Format

Print two lines as described:
- **First line**: The result of integer division \( a // b \).
- **Second line**: The result of float division \( a / b \).

## 🧪 Sample Test Case

### Sample Input 0

\`\`\`plaintext
4
3
\`\`\`

### Sample Output 0

\`\`\`plaintext
1
1.33333333333
\`\`\`

---

### Notes
- Ensure the logic handles division without any rounding or formatting.
- The float division result should reflect the full precision as shown in the sample output.
`;

function Problem() {

    const [answer, setAnswer] = useState()
    const [solved, setSolved] = useState(false)

    const handleSubmit = async () => {
        const options1 = {
            method: 'POST',
            url: 'https://judge0-ce.p.rapidapi.com/submissions',
            params: {
                base64_encoded: 'true',
                wait: 'false',
                fields: '*'
            },
            headers: {
                'x-rapidapi-key': '59c6abef45msh8423d57bab6cb4cp1af51cjsnd84c52d8f6ed',
                'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
                'Content-Type': 'application/json'
            },
            data: {
                language_id: 52,
                source_code: btoa(answer),
                stdin: 'SnVkZ2Uw',
                expected_output: "aGVsbG8sIEp1ZGdlMAo="
            }
        };

        const options2 = (token) => {
            return {
                method: 'GET',
                url: 'https://judge0-ce.p.rapidapi.com/submissions/' + token,
                params: {
                    base64_encoded: 'true',
                    fields: '*'
                },
                headers: {
                    'x-rapidapi-key': '59c6abef45msh8423d57bab6cb4cp1af51cjsnd84c52d8f6ed',
                    'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
                }
            }
        }

        try {
            const response = await axios.request(options1);
            const res2 = await axios.request(options2(response.data.token))
            console.log(res2.data.stdout == res2.data.expected_output);
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login", { replace: true });
                return;
            }
            if (res2.data.stdout == res2.data.expected_output) {
                axios.put("http://localhost:3001/addscore",
                {},
                {
                    headers: { Authorization: `Bearer ${token}` }
                })
                .then((res) => {
                    if (res.data.msg == 'nice'){
                        setSolved(true)
                        console.log(res.data.score)
                    }
                })
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div className='text-3xl flex justify-center my-10'>Problem Number and Date</div>
            <section className="grid grid-cols-2 gap-8 mx-44 mt-10 h-screen">
                <div className='prose prose-sm max-w-none col-span-1 overflow-scroll h-[80%]'>
                    <Markdown>{DIVISION_TASK_MARKDOWN}</Markdown>
                </div>
                <form onSubmit={handleSubmit} action="#" className="space-y-4 h-screen">
                    <div className='h-[74%]'>
                        <label className="sr-only" htmlFor="code">Paste your code here!</label>
                        <textarea
                            className="h-[100%] w-full rounded-lg border-gray-200 p-3 text-sm"
                            placeholder="Paste your code here!"
                            rows="8"
                            id="code"
                            onChange={(e) => { setAnswer(e.target.value) }}
                        ></textarea>
                    </div>

                    <div className="mt-4">
                        <button
                            type="submit"
                            className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                        >
                            Submit Code
                        </button>
                        Status: <span className={solved ? "text-green-500" : "text-red-500"}>{solved ? "Solved" : "Not Solved"}</span>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Problem