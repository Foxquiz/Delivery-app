import { ErrorProps } from "./Error.props";

export function Error({message}:ErrorProps) {
    return (
        <>
            {!Boolean(message) && <p>Что-то пошло не так, попробуйте обновить страницу позже </p>}
            {Boolean(message) && <p>{message}</p>}
        </>
    )
}

