import {
    Body,
    Controller,
    Delete,
    FileTypeValidator,
    Get,
    MaxFileSizeValidator,
    Param,
    ParseFilePipe,
    ParseIntPipe,
    Post,
    Put,
    Query,
    UploadedFile,
    UseInterceptors,
    UsePipes,
    ValidationPipe,
    Session,
    UseGuards,
    Res
    } from '@nestjs/common';
    import { UnauthorizedException } from '@nestjs/common/exceptions';
    import { FileInterceptor } from '@nestjs/platform-express';
    import { diskStorage } from 'multer';
    import { FacultyForm } from './facultyform.dto';
    import { FacultyService } from './facultyservice.service';
    import { StudentForm } from 'src/student/student.dto';
    import { StudentService } from 'src/student/student.service';
    import { SessionGuard } from './session.guard';
    import { Express } from 'express';
  
    
    
    @Controller('/faculty')
    export class FacultyController {
    constructor(private facultyService: FacultyService,
    private studentService: StudentService
    ) {}
    
    @Get('/index')
    getFaculty(): any {
    return this.facultyService.getIndex();
    }
    
    @Get('/findfaculty/:id')
    getFacultyByID(@Param('id', ParseIntPipe) id: number): any {
    return this.facultyService.getFacultyByID(id);
    }
    
    
    
    @Post('/insertfaculty')
    @UsePipes(new ValidationPipe())
    insertFaculty(@Body() mydto: FacultyForm): any {
    return this.facultyService.insertUser(mydto);
    }
    
    @Put('/updatefaculty/')
    @UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe())
    updateFaculty(@Session() session,@Body('name') name: string): any {
    console.log(session.email);
    return this.facultyService.updatefaculty(name, session.email);
    }
    
    @Put('/updatefaculty/:id')
    @UsePipes(new ValidationPipe())
    updateFacultybyid(
    @Body() mydto: FacultyForm,
    @Param('id', ParseIntPipe) id: number,
    ): any {
    return this.facultyService.updatefacultybyid(mydto, id);
    }
    
    @Delete('/deletefaculty/:id')
    deleteFacultybyid(@Param('id', ParseIntPipe) id: number): any {
    return this.facultyService.deleteUserbyid(id);
    }
    
    @Post('/insertstudent')
    @UsePipes(new ValidationPipe())
    insertStudent(@Body() studentdto: StudentForm): any {
    return this.studentService.insertStudent(studentdto);
    }
    @Delete('/deletestudent/:id')
    @UsePipes(new ValidationPipe())
    deleteStudent(@Body() studentdto: StudentForm): any {
    return this.studentService.deleteStudentbyid(studentdto);
    }
    
    @Get('/findstudentsbyfaculty/:id')
    getStudentsByFacultyID(@Param('id', ParseIntPipe) id: number): any {
    return this.facultyService.getStudentsByFacultyID(id);
    }
    
    @Get('/findfacultybystudent/:id')
    getFacultyByStudentID(@Param('id', ParseIntPipe) id: number): any {
    return this.studentService.getFacultyByStudentID(id);
    }
    @Get('/getimage/:name')
    getImages(@Param('name') name, @Res() res) {
      res.sendFile(name,{ root: './uploads' })
    }
    
    @Post('/signup')
    @UseInterceptors(FileInterceptor('myfile',
    {storage:diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
    cb(null,Date.now()+file.originalname)
    }
    })
    }))
    signup(@Body() mydto:FacultyForm,@UploadedFile( new ParseFilePipe({
    validators: [
    new MaxFileSizeValidator({ maxSize: 30000 }),
    new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
    ],
    }),) file: Express.Multer.File )
    {

    mydto.filename = file.filename;  

return this.facultyService.signup(mydto);
console.log(file)
}
@Post('signin')
    async signin(@Body() mydto: FacultyForm) {
      // Assuming you have a signin method in your LibrarianService
      const result = await this.facultyService.signin(mydto);
  
      if (result) {
        // Return success response
        return { message: 'Signin successful' };
      } else {
        // Return error response
        return { message: 'Invalid credentials' };
      }
    }
  
  
  @Get('/signout')
  async signout(@Session() session) {
    if(session.destroy())
  {
    return {message:"you are logged out"};
  }
  else
  {
    throw new UnauthorizedException("invalid actions");
  }
  }
    }