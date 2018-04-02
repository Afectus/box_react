import React from 'react';

class RelativesModal extends React.Component {
    render() {
        return(
            <div>
                <div class="form-group">
                    <label class="col-sm-2 control-label">* Имя</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" />
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label">* Отчество</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" />
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label">* Дата рождения</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" />
                    </div>
                </div>
            </div>
        )
    }
}