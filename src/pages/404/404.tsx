interface Ierror {
  error: Error
}

export const NotFound = ({ error }: Ierror) => {
  return (
    <section className="top-sales">
        <h2 className="text-center">Страница не найдена</h2>
        <p>
            Извините, такая страница не найдена!
            <p>
              {error.message}
            </p>
        </p>
    </section>
  )
}
