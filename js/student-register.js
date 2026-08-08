<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">

    <title>
        Student Registration | Mawaddat-e-Fil-Qurba
    </title>

    <link rel="stylesheet"
          href="../css/auth.css">

</head>


<body>


<div class="auth-page">


    <div class="auth-card register-card">


        <div class="auth-logo">

            <img src="../images/logo.png"
                 alt="Mawaddat-e-Fil-Qurba">

        </div>


        <h1>
            Student Registration
        </h1>


        <p class="auth-subtitle">
            Join Mawaddat-e-Fil-Qurba Online Learning Platform
        </p>


        <form id="studentRegisterForm">


            <label>
                Full Name
            </label>

            <input
                type="text"
                id="name"
                placeholder="Enter your full name"
                required
            >


            <label>
                Email Address
            </label>

            <input
                type="email"
                id="email"
                placeholder="Enter your email"
                required
            >


            <label>
                Phone Number
            </label>

            <input
                type="tel"
                id="phone"
                placeholder="03XXXXXXXXX"
                required
            >


            <label>
                WhatsApp Number
            </label>

            <input
                type="tel"
                id="whatsapp"
                placeholder="03XXXXXXXXX"
                required
            >


            <label>
                Age
            </label>

            <input
                type="number"
                id="age"
                placeholder="Enter your age"
                min="5"
                max="100"
                required
            >


            <label>
                City
            </label>

            <input
                type="text"
                id="city"
                placeholder="Enter your city"
                required
            >


            <label>
                Select Course
            </label>

            <select id="course"
                    required>

                <option value="">
                    Select your course
                </option>

                <option value="معرفتِ معصومین">
                    معرفتِ معصومین
                </option>

                <option value="معرفتِ عقیدہ">
                    معرفتِ عقیدہ
                </option>

                <option value="معرفتِ فقہ اہل بیتؑ">
                    معرفتِ فقہ اہل بیتؑ
                </option>

                <option value="معرفتِ قرآن">
                    معرفتِ قرآن
                </option>

                <option value="تفسیر القرآن">
                    تفسیر القرآن
                </option>

                <option value="احادیثِ اہل بیتؑ">
                    احادیثِ اہل بیتؑ
                </option>

            </select>


            <label>
                Password
            </label>

            <input
                type="password"
                id="password"
                placeholder="Create password"
                minlength="6"
                required
            >


            <label>
                Confirm Password
            </label>

            <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm password"
                minlength="6"
                required
            >


            <button
                type="submit"
                class="auth-btn"
                id="registerBtn">

                Create Student Account

            </button>


        </form>


        <div id="message"
             class="message">
        </div>


        <p style="margin-top:20px; font-size:14px; color:#68756e;">

            Already have an account?

        </p>


        <a href="student-login.html"
           class="register-btn">

            Student Login

        </a>


        <a href="../index.html"
           class="back-home">

            ← Back to Home

        </a>


    </div>


</div>


<script type="module"
        src="../js/student-register.js">
</script>


</body>

</html>
