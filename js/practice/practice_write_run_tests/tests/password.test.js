
// Select one of the Password versions to test

// import { Password } from '../src/BugDoesNotHash'                 // -- WORKS --
// import { Password } from '../src/BugDoesNotTrim'                 // -- WORKS --
// import { Password } from '../src/BugisPasswordAlwaysSame'        // -- WORKS -- 
// import { Password } from '../src/BugMissingNumberCheck'          // -- WORKS --
// import { Password } from '../src/BugMissingPasswordCheck'        // -- WORKS --
// import { Password } from '../src/BugNeverContainsNumbers'        // -- WORKS --
// import { Password } from '../src/BugToShortPassword'             // -- WORKS -- 
// import { Password } from '../src/BugVeryShort'                   // -- WORKS -- 
// import { Password } from '../src/BugWrongHashingAlgorithm'       // -- WORKS --
// import { Password } from '../src/BugWrongMessage'                // -- WORKS --
import { Password } from '../src/Correct'                        // -- WORKS --

describe('Password class, test suite', () => {
    //put constants here to increase readability
    const validPassword1 = 'HejsanSvejsan123'
    const validpassword1WithSpaces = ' HejsanSvejsan123 '
    const validPassword2 ='HejsanSvejsan1234'
    const tooShortPassword = 'Hejsan12345'
    const noDigitPassword = 'HejsanSvejsan'

    test('constructor should throw error for too short password', ()=>{
        expect(()=>{new Password(tooShortPassword)}).toThrow('Too short password')
    })

    test('constructor should throw error for no numbers found', ()=> {
        expect(()=>{new Password(noDigitPassword)}).toThrow('No number found')
    })

    test('constructor should not throw error for 12+ characters and digits',()=> {
        expect(()=>{new Password(validPassword1)}).not.toThrow(Error)
    })

    test('constructor should trim leading and trailing spaces',()=> {
        expect(new Password(validPassword1).isPasswordSame(new Password(validpassword1WithSpaces))).toBe(true)
    })

    test('getPasswordHash should return number for valid password', ()=> {
        expect(typeof new Password(validPassword1).getPasswordHash()).toBe('number')
    })

    test('isPasswordSame should return false for not the same input', ()=> {
        expect(new Password(validPassword1).isPasswordSame(new Password(validPassword2))).toBe(false)
    })

    test('isPasswordSame should throw error for non-password argument', ()=>{
        expect(()=>{new Password(validPassword1).isPasswordSame('Hej')}).toThrow('Invalid argument')
    })

    test('getPasswordHash should match expected simple hash for a valid password', () => {
        function expectedSimpleHash(str) {
            let hash = 7
            for (let i = 0; i < str.length; i++) {
                hash = hash * 31 + str.charCodeAt(i)
            }
        return hash
        }
        expect(new Password(validPassword1).getPasswordHash()).toBe(expectedSimpleHash(validPassword1))
    })
})