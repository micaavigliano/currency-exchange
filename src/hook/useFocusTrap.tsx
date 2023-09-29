import {useRef, useEffect} from 'react'

const FOCUSABLE_ELEMENTS = 'a, input, [tabindex="0"]'

const KEY_CODE = '9'

export const useFocusTrap = () => {
    const ref = useRef<HTMLElement | null>(null)

    const handleFocus = (event: any) => {
        const refElement = ref?.current
        
        if (!!refElement) {
            const focusableElem = Array.from(refElement.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS)).filter((el) => !el.hasAttribute("disabled")) as HTMLElement[]

            const firstFocusableElem = focusableElem[0]
            const lastFocusableElem = focusableElem[focusableElem.length - 1]

            const isPressed = event.key === 'Tab' || event.code === "9"

            if (!isPressed) {
                return;
            }

            if (event.shiftKey) {
                if(document.activeElement === firstFocusableElem) {
                    lastFocusableElem.focus()
                    event.preventDefault()
                }
            } else if (document.activeElement === lastFocusableElem) {
                firstFocusableElem.focus()
                event.preventDefault()
            }
        }
    }
    useEffect(() => {
        const current = ref.current
        current?.addEventListener("keydown", handleFocus)
        current?.removeEventListener('click', handleFocus)

        return () => {
            current?.removeEventListener("keydown", handleFocus)
        }
    }, [])


    return ref;
}