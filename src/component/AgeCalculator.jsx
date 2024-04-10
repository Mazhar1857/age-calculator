import React, { useEffect, useState } from 'react';
import iconArrow from '../assets/icon-arrow.svg'
import './ageCalculator.css'

function AgeCalculator() {

    const [dob, setDob] = useState({
        "day": '',
        "month": '',
        "year": ''
    });

    const [errorMsg, setErrorMsg] = useState({
        "day": 'none',
        "month": 'none',
        "year": 'none'
    })

    const [age, setAge] = useState({
        "day": null,
        "month": null,
        "year": null
    })

    const [btn, setBtn] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target
        if (!isNaN(value)) {
            setDob((preDob) => {
                return { ...preDob, [name]: Number(value) }
            })
        }
    }

    const isLeapYear = (year) => {

        if (year % 4 === 0) {
            if (year % 100 === 0 && year % 400 !== 0) {
                return false;
            }
            return true;
        }
        return false;
    }

    const [validDay, setValidDay] = useState(false);
    const [validMonth, setValidMonth] = useState(false);
    const [validYear, setValidYear] = useState(false);


    const dayValidation = (day) => {
        let isValidDay = false;
        if (btn) {
            isValidDay = true;
            let newError = {};
            if (day === '') {
                newError["day"] = 'This field is requird';
                isValidDay = false;
            } else if (day === 0 || day > 31) {
                newError['day'] = 'Must be a valid day'
                isValidDay = false;
            }
            else if (dob["month"] > 0 && dob["month"] <= 7) {
                if (dob["month"] % 2 === 0 && dob["month"] !== 2) {

                    if (day > 30) {
                        newError["day"] = 'Must be a valid day';
                        isValidDay = false;
                    }

                } else if (dob["month"] % 2 !== 0 && dob["month"] !== 2) {

                    if (day > 31) {
                        newError["day"] = 'Must be a valid day';
                        isValidDay = false;
                    }

                } else if (dob["month"] === 2) {

                    if (isLeapYear(dob["year"])) {
                        if (day > 29) {
                            newError["day"] = 'Must be a valid day';
                            isValidDay = false;
                        }
                    } else {
                        if (day > 28) {
                            newError["day"] = 'Must be a valid day';
                            isValidDay = false;
                        }
                    }
                }
            } else if (dob["month"] > 7 && dob["month"] <= 12) {
                if (dob["month"] % 2 === 0 && dob["month"] !== 2) {
                    if (day > 31) {
                        newError["day"] = 'Must be a valid day';
                        isValidDay = false;
                    }
                } else if (dob["month"] % 2 !== 0 && dob["month"] !== 2) {
                    if (day > 30) {
                        newError["day"] = 'Must be a valid day';
                        isValidDay = false;
                    }
                }
            } else if (dob['month'] > 12) {
                if (dob["month"] % 2 === 0 && dob["month"] !== 2) {
                    if (day > 31) {
                        newError["day"] = 'Must be a valid day';
                        isValidDay = false;
                    }
                } else if (dob["month"] % 2 !== 0 && dob["month"] !== 2) {
                    if (day > 30) {
                        newError["day"] = 'Must be a valid day';
                        isValidDay = false;
                    }
                }
            }

            setErrorMsg((preError) => {
                return { ...preError, ...newError }
            });
            setValidDay(isValidDay);
        }
    }


    const monthValidation = (month) => {
        let isValidMonth = false
        if (btn) {
            isValidMonth = true;
            const newError = {}

            if (month === '') {
                newError["month"] = 'This field is requird'
                isValidMonth = false;
            }
            else if (month < 1 || month > 12) {
                newError["month"] = 'Must be a valid month'
                isValidMonth = false;
            }
            setErrorMsg((preError) => {
                return { ...preError, ...newError }
            });
        }
        setValidMonth(isValidMonth);
    }


    const yearValidation = (year) => {
        let isValidYear;
        if (btn) {
            isValidYear = true;
            const date = new Date();
            const newError = {};
            const currentYear = date.getFullYear();
            if (year === '') {
                newError['year'] = 'This field is required';
                isValidYear = false;
            } else if (year === 0) {
                newError['year'] = 'Must be a valid year'
                isValidYear = false;
            }
            else if (year > currentYear) {
                newError["year"] = "Must be in the past";
                isValidYear = false;
            }
            setErrorMsg((preError) => {
                return { ...preError, ...newError }
            })
        }
        setValidYear(isValidYear);
    }

    useEffect(() => {
        dayValidation(dob["day"]);
        monthValidation(dob["month"]);
        yearValidation(dob["year"]);

        if (validDay) {
            setErrorMsg((preError) => {
                return { ...preError, ["day"]: 'none' }
            })
        }
        if (validMonth) {
            setErrorMsg((preError) => {
                return { ...preError, ["month"]: 'none' }
            })
        }
        if (validYear) {
            setErrorMsg((preError) => {
                return { ...preError, ["year"]: 'none' }
            })
        }

        if (validDay && validMonth && validYear) {
            ageCalculation();
        }
        setTimeout(() => {
            setBtn(false);
        }, 1000)


    }, [dob["day"], dob["month"], dob["year"], validDay, validMonth, validYear, btn])

    const ageCalculation = () => {
        const d = new Date();
        const currentDay = d.getDate();
        const currentMonth = d.getMonth() + 1;
        const currentYear = d.getFullYear();

        const newAge = {
            "day": null,
            "month": null,
            "year": null
        }

        newAge['day'] = currentDay - dob['day'];
        newAge['month'] = currentMonth - dob['month'];
        newAge['year'] = currentYear - dob['year'];

        if (newAge['day'] < 0) {
            newAge['month'] -= 1;

            if (currentMonth === 3) {
                newAge['day'] = isLeapYear(currentYear) ? (newAge['day'] + 29) : (newAge['day'] + 28);
            } else if (currentMonth === 1) {
                newAge['day'] += 31;
            } else {
                if (currentMonth <= 7) {
                    newAge['day'] = currentMonth % 2 == 0 ? (newAge['day'] + 31) : (newAge['day'] + 30);
                } else if (currentMonth <= 12) {
                    newAge['day'] = currentMonth % 2 == 0 ? (newAge['day'] + 30) : (newAge['day'] + 31);
                }
            }
        }

        if (newAge['month'] < 0) {

            newAge['year'] -= 1;
            newAge['month'] += 12;
        }

        setAge(newAge)

    }


    const submitDob = () => {
        setBtn(true);
    }

    return (
        <>
            <div className='age-calculator'>
                <section className='user-dob'>
                    <div className='user-input day'>
                        <label className={errorMsg['day'] === 'none' ? '' : 'error'} htmlFor="day">DAY</label>
                        <input className={errorMsg['day'] === 'none' ? '' : 'error'} type="text" name='day' id='day' placeholder='DD' value={dob["day"]} onChange={handleChange} />
                        {errorMsg['day'] === 'none' ? <div></div> : <div className='error'>{errorMsg['day']}</div>}
                    </div>
                    <div className='user-input month'>
                        <label className={errorMsg['month'] === 'none' ? '' : 'error'} htmlFor="month">MONTH</label>
                        <input className={errorMsg['month'] === 'none' ? '' : 'error'} type="text" name='month' id='month' placeholder='MM' value={dob["month"]} onChange={handleChange} />
                        {errorMsg['month'] === 'none' ? <div></div> : <div className='error'>{errorMsg['month']}</div>}
                    </div>
                    <div className='user-input year'>
                        <label className={errorMsg['year'] === 'none' ? '' : 'error'} htmlFor="year">YEAR</label>
                        <input className={errorMsg['year'] === 'none' ? '' : 'error'} type="text" name='year' id='year' placeholder='YYYY' value={dob["year"]} onChange={handleChange} />
                        {errorMsg['year'] === 'none' ? <div></div> : <div className='error'>{errorMsg['year']}</div>}
                    </div>
                </section>
                <section className='dob-submit-btn'>
                    <hr />
                    <button onClick={submitDob}><img src={iconArrow} alt="" /></button>
                </section>
                <section className='user-age'>
                    <div><span className='custom-dash'>{age["year"] === null ? <span>&#8211; &#8211;</span> : age["year"]}</span>years</div>
                    <div><span className='custom-dash'>{age["month"] === null ? <span>&#8211; &#8211;</span> : age["month"]}</span>months</div>
                    <div><span className='custom-dash'>{age["day"] === null ? <span>&#8211; &#8211;</span> : age["day"]}</span>days</div>
                </section>
            </div>
        </>
    )
}
export default AgeCalculator
