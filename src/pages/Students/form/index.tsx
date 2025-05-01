import { Controller, useFormContext } from "react-hook-form";
import { StudentSchema } from "./schema";

const StudentForm = () => {
  const { control, register, formState: { errors } } = useFormContext<StudentSchema>();

  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700">Nome</label>
        <Controller
          control={control}
          name="name"
          rules={{ required: true }}
          render={({ field }) => (
            <div>

            <input
              type="text"
              {...field}
              {...register("name")}
              className="mt-1 px-2 w-full border h-8 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {
                errors.name && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.name.message}
                  </span>
                )
              }
              </div>
          )}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          E-mail
        </label>
        <Controller
          control={control}
          name="email"
          rules={{ required: true }}
          render={({ field }) => (
            <div>

            <input
                type="email"
                {...field}
                {...register("email")}
                className="mt-1 px-2 w-full border h-8 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {
                errors.email && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </span>
                )
              }
            </div>
          )}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Data de Nascimento
        </label>
        <Controller
          control={control}
          name="dateOfBirth"
          rules={{ required: true }}
          render={({ field }) => (  
            <div>
            <input
              type="date"
              {...field}
              {...register("dateOfBirth")}
              className="mt-1 px-2 w-full border h-8 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {
                errors.dateOfBirth && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.dateOfBirth.message}
                  </span>
                )
              }
            </div>
          )}
        />
      </div>
    </>
  );
};

export default StudentForm;
